import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import UserAvatarDropdown from "@/components/UserAvatarDropdown";
import { Sun, Moon, Home, LayoutDashboard, FlaskConical, History } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
    const { isAuthenticated } = useAuth();
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    // Listen for dark mode changes from Settings page (via class mutations)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const hasDark = document.documentElement.classList.contains("dark");
            setIsDark(hasDark);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top header bar */}
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-end px-6 gap-4 sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDark}
                        className="rounded-lg"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                    </Button>
                    <UserAvatarDropdown />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto pb-16 md:pb-0">
                    <Outlet />
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around z-40">
                    <NavLink to="/home" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        <Home className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Home</span>
                    </NavLink>
                    <NavLink to="/dashboard" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to="/new-analysis" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        <FlaskConical className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Analysis</span>
                    </NavLink>
                    <NavLink to="/history" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        <History className="w-5 h-5" />
                        <span className="text-[10px] font-medium">History</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default AppLayout;
