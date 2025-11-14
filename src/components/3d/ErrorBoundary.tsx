import React from "react";

export class ErrorBoundary extends React.Component<{ fallback?: React.ReactNode }, { hasError: boolean; msg?: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, msg: "" };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, msg: String(error?.message || error) };
  }
  componentDidCatch(error: any, info: any) {
    console.error("3D ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div className="p-3 text-sm text-red-600">3D preview failed: {this.state.msg}</div>;
    }
    return this.props.children as any;
  }
}
