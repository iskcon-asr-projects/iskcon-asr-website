"use client";
import React from "react";

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-red-500 p-10 font-mono text-sm z-[9999] relative">
          <h2 className="text-2xl mb-4 font-bold text-white">Application Crashed</h2>
          <p className="mb-4">An unexpected error occurred during rendering.</p>
          <pre className="bg-red-950/30 p-4 rounded border border-red-900 overflow-auto max-w-4xl text-red-300">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
          >
            Hard Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
