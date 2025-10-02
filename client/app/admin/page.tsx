'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/admin/PageHeader';
import { useGetFeaturesQuery } from '@/redux/apis/featuresApi';
import { useGetTestimonialsQuery } from '@/redux/apis/testimonialsApi';
import { useGetServicesQuery } from '@/redux/apis/servicesApi';
import { useGetProjectsQuery } from '@/redux/apis/projectsApi';
import {
  Zap,
  MessageSquare,
  Globe,
  Users,
  FileText,
  Bell,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

const recentActivities = [
  { id: 1, action: 'New testimonial added', user: 'Admin', time: '2 hours ago', type: 'create' },
  { id: 2, action: 'Service updated: Web Development', user: 'Admin', time: '4 hours ago', type: 'update' },
  // { id: 3, action: 'Blog post published', user: 'Admin', time: '1 day ago', type: 'create' },
  // { id: 4, action: 'Team member added', user: 'Admin', time: '2 days ago', type: 'create' },
  { id: 5, action: 'Feature updated', user: 'Admin', time: '3 days ago', type: 'update' },
];

const quickActions = [
  { name: 'Add Feature', href: '/admin/features', icon: Zap, color: 'bg-blue-500' },
  { name: 'New Testimonial', href: '/admin/testimonials', icon: MessageSquare, color: 'bg-green-500' },
  { name: 'Create Service', href: '/admin/services', icon: Globe, color: 'bg-purple-500' },
  // { name: 'Add Team Member', href: '/admin/team', icon: Users, color: 'bg-orange-500' },
  // { name: 'Write Blog Post', href: '/admin/blog', icon: FileText, color: 'bg-indigo-500' },
  // { name: 'New Notification', href: '/admin/notifications', icon: Bell, color: 'bg-red-500' },
];

export default function AdminDashboard() {
  const { data: featuresData } = useGetFeaturesQuery();
  const { data: testimonialsData } = useGetTestimonialsQuery();
  const { data: servicesData } = useGetServicesQuery();
  const { data: projectsData } = useGetProjectsQuery();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { name: 'Total Features', value: featuresData?.length?.toString() || '0', icon: Zap, change: '+2.1%', changeType: 'positive', href: '/admin/features' },
    { name: 'Testimonials', value: testimonialsData?.length?.toString() || '0', icon: MessageSquare, change: '+4.3%', changeType: 'positive', href: '/admin/testimonials' },
    { name: 'Services', value: servicesData?.length?.toString() || '0', icon: Globe, change: '+1.2%', changeType: 'positive', href: '/admin/services' },
    { name: 'Projects', value: projectsData?.length?.toString() || '0', icon: Globe, change: '+1.2%', changeType: 'positive', href: '/admin/projects' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Welcome to Inficom Solutions Admin Panel - ${currentTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`}
      />

      {/* Welcome Banner */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Manage your website content and monitor growth from here.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-blue-100 text-xs sm:text-sm">
              {currentTime.toLocaleDateString('en-US', { timeZoneName: 'short' })}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-4 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span
                      className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2 hover:shadow-md transition-shadow"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-center">{action.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* System Status */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
            System Status
          </h3>
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Website Status</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Status</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-500 text-xs sm:text-sm">2 hours ago</span>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Performance Metrics
          </h3>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Page Views</span>
              <span className="font-semibold text-blue-600">12,345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold text-green-600">3.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg. Session Duration</span>
              <span className="font-semibold text-purple-600">2m 34s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="font-semibold text-orange-600">45.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold text-indigo-600">1,234</span>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1 sm:mt-2 ${
                    activity.type === 'create' ? 'bg-green-400' : 'bg-blue-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
