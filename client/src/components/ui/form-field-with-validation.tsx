import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormFieldWithValidationProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  description?: string;
  className?: string;
}

export function FormFieldWithValidation({
  form,
  name,
  label,
  type = "text",
  placeholder,
  options = [],
  required = false,
  description,
  className,
}: FormFieldWithValidationProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationState, setValidationState] = useState<"idle" | "valid" | "invalid">("idle");
  
  const fieldState = form.getFieldState(name);
  const fieldValue = form.watch(name);
  
  useEffect(() => {
    if (fieldValue && fieldValue !== "") {
      setIsValidating(true);
      const timer = setTimeout(() => {
        setIsValidating(false);
        setValidationState(fieldState.error ? "invalid" : "valid");
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setValidationState("idle");
    }
  }, [fieldValue, fieldState.error]);

  const getValidationIcon = () => {
    if (isValidating) return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />;
    if (validationState === "valid") return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (validationState === "invalid") return <AlertCircle className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getInputClassName = () => {
    const baseClass = "transition-all duration-200";
    if (validationState === "valid") return cn(baseClass, "border-green-500 focus:border-green-500");
    if (validationState === "invalid") return cn(baseClass, "border-red-500 focus:border-red-500");
    return baseClass;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="flex items-center gap-2">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="relative">
            <FormControl>
              {type === "textarea" ? (
                <Textarea
                  placeholder={placeholder}
                  className={cn(getInputClassName(), "min-h-[100px] pr-10")}
                  {...field}
                />
              ) : type === "select" ? (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={getInputClassName()}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  className={cn(getInputClassName(), "pr-10")}
                  {...field}
                />
              )}
            </FormControl>
            {type !== "select" && (
              <div className="absolute right-3 top-3">
                {getValidationIcon()}
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-red-500 text-sm animate-in slide-in-from-left-1" />
        </FormItem>
      )}
    />
  );
}