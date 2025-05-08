"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { FiAlertTriangle, FiCheckCircle, FiXCircle, FiUpload } from 'react-icons/fi';

export default function Dashboard() {
  const { user, isAuthenticated, loading, isApproved, canAddListings } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Welcome back, {user.name}!
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your personal dashboard
              </p>
            </div>
            <div className="flex space-x-3">
              {canAddListings ? (
                <>
                  <Link href="/properties/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Property
                  </Link>
                  <Link href="/gigs/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Post Gig
                  </Link>
                </>
              ) : (
                <button disabled className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed">
                  Listings Unavailable
                </button>
              )}
            </div>
          </div>
          {/* Approval Status Banner */}
          {user.status === 'pending' && (
            <div className="bg-yellow-50 border-t border-b border-yellow-200 px-4 py-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Account Pending Approval</h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>
                      Your account is currently awaiting admin verification. You'll be able to add listings once your airline employment is verified.
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="ml-3 bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                      >
                        <span className="flex items-center">
                          <FiUpload className="mr-1" />
                          Upload Additional Verification
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {user.status === 'approved' && (
            <div className="bg-green-50 border-t border-b border-green-200 px-4 py-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Your account has been verified and approved.</p>
                </div>
              </div>
            </div>
          )}
          {user.status === 'rejected' && (
            <div className="bg-red-50 border-t border-b border-red-200 px-4 py-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiXCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Verification Rejected</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>Your account verification was not approved. Please contact support for more information.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Role
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.role === 'host' ? 'Property Host' : 
                   user.role === 'employer' ? 'Employer' : 'Crew Member'}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account Status
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'approved' ? 'bg-green-100 text-green-800' : user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status === 'approved' ? 'Approved' : user.status === 'pending' ? 'Pending Verification' : 'Rejected'}
                  </span>
                  {user.status === 'pending' && (
                    <p className="mt-1 text-xs text-gray-500">
                      Your account is pending admin verification of your airline employment.
                    </p>
                  )}
                </dd>
              </div>
              {user.airline && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Airline
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.airline}
                  </dd>
                </div>
              )}
              {user.position && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Position
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.position}
                  </dd>
                </div>
              )}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Member since
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Properties
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        View and manage your properties
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/dashboard/properties" className="font-medium text-blue-700 hover:text-blue-900">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Gigs
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        View and manage your gig postings
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/dashboard/gigs" className="font-medium text-green-700 hover:text-green-900">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Profile
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        Edit your profile information
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/dashboard/profile" className="font-medium text-purple-700 hover:text-purple-900">
                  Edit profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
