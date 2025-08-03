import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", role: "admin" });
  const [launchUpdateForm, setLaunchUpdateForm] = useState({ title: "", content: "", isPublished: false });
  const { toast } = useToast();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (data) => {
      setUser(data.user);
      setIsLoggedIn(true);
      toast({ title: "Login successful", description: "Welcome to the admin panel" });
    },
    onError: (error: Error) => {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: { username: string; email: string; password: string; role: string }) => {
      return apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },
    onSuccess: (data) => {
      toast({ title: "Registration submitted", description: data.message });
      setRegisterForm({ username: "", email: "", password: "", role: "admin" });
    },
    onError: (error: Error) => {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    },
  });

  // Create launch update mutation
  const createUpdateMutation = useMutation({
    mutationFn: async (updateData: { title: string; content: string; isPublished: boolean; authorId: number }) => {
      return apiRequest("/api/launch-updates/create", {
        method: "POST",
        body: JSON.stringify(updateData),
      });
    },
    onSuccess: () => {
      toast({ title: "Launch update created", description: "Update has been saved successfully" });
      setLaunchUpdateForm({ title: "", content: "", isPublished: false });
      queryClient.invalidateQueries({ queryKey: ["/api/launch-updates/all"] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create update", description: error.message, variant: "destructive" });
    },
  });

  // Queries
  const { data: launchUpdates } = useQuery({
    queryKey: ["/api/launch-updates/all"],
    enabled: isLoggedIn,
  });

  const { data: earlyAccessRequests } = useQuery({
    queryKey: ["/api/early-access/requests"],
    enabled: isLoggedIn,
  });

  const { data: contactSubmissions } = useQuery({
    queryKey: ["/api/contact/submissions"],
    enabled: isLoggedIn,
  });

  const { data: pendingUsers } = useQuery({
    queryKey: ["/api/auth/pending-users"],
    enabled: isLoggedIn,
  });

  // Approve user mutation
  const approveUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      return apiRequest(`/api/auth/approve-user/${userId}`, { method: "POST" });
    },
    onSuccess: () => {
      toast({ title: "User approved", description: "User has been approved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/pending-users"] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to approve user", description: error.message, variant: "destructive" });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerForm);
  };

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    createUpdateMutation.mutate({ ...launchUpdateForm, authorId: user.id });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-800">HabiGrid Admin</h1>
            <p className="text-emerald-600 mt-2">Access the admin dashboard</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Access your admin account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Request admin access (requires approval)</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="reg-username">Username</Label>
                      <Input
                        id="reg-username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                      {registerMutation.isPending ? "Submitting..." : "Request Access"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsLoggedIn(false);
              setUser(null);
            }}
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="launch-updates">Launch Updates</TabsTrigger>
            <TabsTrigger value="early-access">Early Access</TabsTrigger>
            <TabsTrigger value="contact">Contact Forms</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Launch Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{launchUpdates?.updates?.length || 0}</p>
                  <p className="text-sm text-gray-600">Total updates</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Early Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{earlyAccessRequests?.requests?.length || 0}</p>
                  <p className="text-sm text-gray-600">Requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Forms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{contactSubmissions?.submissions?.length || 0}</p>
                  <p className="text-sm text-gray-600">Messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{pendingUsers?.pendingUsers?.length || 0}</p>
                  <p className="text-sm text-gray-600">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="launch-updates">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Launch Update</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={launchUpdateForm.title}
                        onChange={(e) => setLaunchUpdateForm({ ...launchUpdateForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        rows={4}
                        value={launchUpdateForm.content}
                        onChange={(e) => setLaunchUpdateForm({ ...launchUpdateForm, content: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="published"
                        type="checkbox"
                        checked={launchUpdateForm.isPublished}
                        onChange={(e) => setLaunchUpdateForm({ ...launchUpdateForm, isPublished: e.target.checked })}
                      />
                      <Label htmlFor="published">Publish immediately</Label>
                    </div>
                    <Button type="submit" disabled={createUpdateMutation.isPending}>
                      {createUpdateMutation.isPending ? "Creating..." : "Create Update"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Launch Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {launchUpdates?.updates?.map((update: any) => (
                      <div key={update.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{update.title}</h3>
                          <Badge variant={update.isPublished ? "default" : "secondary"}>
                            {update.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{update.content}</p>
                        <p className="text-sm text-gray-500">
                          By {update.author?.username} • {format(new Date(update.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="early-access">
            <Card>
              <CardHeader>
                <CardTitle>Early Access Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earlyAccessRequests?.requests?.map((request: any) => (
                    <div key={request.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-gray-600">{request.email}</p>
                        </div>
                        <Badge>{request.status}</Badge>
                      </div>
                      {request.company && <p><strong>Company:</strong> {request.company}</p>}
                      {request.phone && <p><strong>Phone:</strong> {request.phone}</p>}
                      {request.message && <p><strong>Message:</strong> {request.message}</p>}
                      <p className="text-sm text-gray-500 mt-2">
                        {format(new Date(request.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions?.submissions?.map((submission: any) => (
                    <div key={submission.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{submission.name}</h3>
                          <p className="text-gray-600">{submission.email}</p>
                        </div>
                        <Badge>{submission.status}</Badge>
                      </div>
                      <p><strong>Subject:</strong> {submission.subject}</p>
                      {submission.company && <p><strong>Company:</strong> {submission.company}</p>}
                      {submission.phone && <p><strong>Phone:</strong> {submission.phone}</p>}
                      <p><strong>Message:</strong> {submission.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {format(new Date(submission.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Pending Approvals</h3>
                  {pendingUsers?.pendingUsers?.map((pendingUser: any) => (
                    <div key={pendingUser.id} className="border p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{pendingUser.username}</h4>
                        <p className="text-gray-600">{pendingUser.email}</p>
                        <p className="text-sm text-gray-500">Role: {pendingUser.role}</p>
                        <p className="text-sm text-gray-500">
                          Requested: {format(new Date(pendingUser.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                      <Button 
                        onClick={() => approveUserMutation.mutate(pendingUser.id)}
                        disabled={approveUserMutation.isPending}
                      >
                        Approve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}