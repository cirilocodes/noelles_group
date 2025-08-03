import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Mail, 
  Megaphone, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';

const launchUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  isPublished: z.boolean().default(false),
});

type LaunchUpdateData = z.infer<typeof launchUpdateSchema>;

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  isApproved: boolean;
  createdAt: string;
}

interface LaunchUpdate {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
}

interface EarlyAccessRequest {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUpdate, setSelectedUpdate] = useState<LaunchUpdate | null>(null);
  const [isCreateUpdateOpen, setIsCreateUpdateOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  const authHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
  });

  // Queries
  const { data: stats } = useQuery({
    queryKey: ['/api/admin/dashboard/stats'],
    queryFn: () => apiRequest('/api/admin/dashboard/stats', {
      headers: authHeaders(),
    }),
  });

  const { data: updates } = useQuery({
    queryKey: ['/api/admin/launch-updates'],
    queryFn: () => apiRequest('/api/admin/launch-updates', {
      headers: authHeaders(),
    }),
  });

  const { data: users } = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: () => apiRequest('/api/admin/users', {
      headers: authHeaders(),
    }),
  });

  const { data: earlyAccess } = useQuery({
    queryKey: ['/api/early-access/requests'],
    queryFn: () => apiRequest('/api/early-access/requests', {
      headers: authHeaders(),
    }),
  });

  const { data: contacts } = useQuery({
    queryKey: ['/api/contact/submissions'],
    queryFn: () => apiRequest('/api/contact/submissions', {
      headers: authHeaders(),
    }),
  });

  // Form for launch updates
  const updateForm = useForm<LaunchUpdateData>({
    resolver: zodResolver(launchUpdateSchema),
    defaultValues: {
      title: '',
      content: '',
      isPublished: false,
    },
  });

  // Mutations
  const createUpdateMutation = useMutation({
    mutationFn: (data: LaunchUpdateData) =>
      apiRequest('/api/admin/launch-updates', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/launch-updates'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard/stats'] });
      toast({ title: 'Launch update created successfully!' });
      setIsCreateUpdateOpen(false);
      updateForm.reset();
    },
  });

  const approveUserMutation = useMutation({
    mutationFn: (userId: number) =>
      apiRequest(`/api/admin/users/${userId}/approve`, {
        method: 'PATCH',
        headers: authHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/dashboard/stats'] });
      toast({ title: 'User approved successfully!' });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ endpoint, id, status }: { endpoint: string; id: number; status: string }) =>
      apiRequest(`${endpoint}/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/early-access/requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/contact/submissions'] });
      toast({ title: 'Status updated successfully!' });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setLocation('/admin/login');
  };

  const onCreateUpdate = (data: LaunchUpdateData) => {
    createUpdateMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      approved: "default",
      rejected: "destructive",
      unread: "destructive",
      read: "secondary",
      responded: "default",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-emerald-600">HabiGrid Admin</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Launch Updates
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="early-access" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Early Access
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.stats?.pendingUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Early Access</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.stats?.totalEarlyAccess || 0}</div>
                  <p className="text-xs text-muted-foreground">Total requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Contacts</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.stats?.unreadContacts || 0}</div>
                  <p className="text-xs text-muted-foreground">Need response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published Updates</CardTitle>
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.stats?.publishedUpdates || 0}</div>
                  <p className="text-xs text-muted-foreground">Live updates</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Launch Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Launch Updates</h2>
              <Dialog open={isCreateUpdateOpen} onOpenChange={setIsCreateUpdateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Create Launch Update</DialogTitle>
                    <DialogDescription>
                      Create a new launch update to share with your audience.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...updateForm}>
                    <form onSubmit={updateForm.handleSubmit(onCreateUpdate)} className="space-y-4">
                      <FormField
                        control={updateForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter update title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter update content" 
                                rows={6}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateForm.control}
                        name="isPublished"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Publish Immediately</FormLabel>
                              <FormDescription>
                                Make this update visible to the public
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsCreateUpdateOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createUpdateMutation.isPending}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          {createUpdateMutation.isPending ? 'Creating...' : 'Create Update'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updates?.updates?.map((update: LaunchUpdate) => (
                      <TableRow key={update.id}>
                        <TableCell className="font-medium">{update.title}</TableCell>
                        <TableCell>{update.author?.username}</TableCell>
                        <TableCell>
                          {update.isPublished ? (
                            <Badge>Published</Badge>
                          ) : (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(update.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.users?.map((user: AdminUser) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {user.isApproved ? (
                            <Badge>Approved</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {!user.isApproved && (
                            <Button
                              size="sm"
                              onClick={() => approveUserMutation.mutate(user.id)}
                              disabled={approveUserMutation.isPending}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Early Access Tab */}
          <TabsContent value="early-access" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Early Access Requests</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earlyAccess?.requests?.map((request: EarlyAccessRequest) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.company || 'N/A'}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {request.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateStatusMutation.mutate({
                                    endpoint: '/api/early-access/requests',
                                    id: request.id,
                                    status: 'approved'
                                  })}
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateStatusMutation.mutate({
                                    endpoint: '/api/early-access/requests',
                                    id: request.id,
                                    status: 'rejected'
                                  })}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contact Submissions</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts?.submissions?.map((contact: ContactSubmission) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                        <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {contact.status === 'unread' && (
                              <Button
                                size="sm"
                                onClick={() => updateStatusMutation.mutate({
                                  endpoint: '/api/contact/submissions',
                                  id: contact.id,
                                  status: 'read'
                                })}
                                variant="outline"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            {contact.status === 'read' && (
                              <Button
                                size="sm"
                                onClick={() => updateStatusMutation.mutate({
                                  endpoint: '/api/contact/submissions',
                                  id: contact.id,
                                  status: 'responded'
                                })}
                                className="bg-emerald-600 hover:bg-emerald-700"
                              >
                                Mark Responded
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}