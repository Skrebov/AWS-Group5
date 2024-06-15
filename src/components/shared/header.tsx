import { navItems } from '@/constants/data';
import { usePathname } from '@/pages/hooks/use-pathname.tsx';
import Heading from './heading';
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/pages/auth-provider.tsx";

// Custom hook to find the matched path
const useMatchedPath = (pathname: string) => {
    const matchedPath =
        navItems.find((item) => item.href === pathname) ||
        navItems.find(
            (item) => pathname.startsWith(item.href + '/') && item.href !== '/'
        );
    return matchedPath?.title || '';
};

export default function Header() {
    const pathname = usePathname();
    const headingText = useMatchedPath(pathname);

    const { signOut } = useAuth();

    return (
        <div className="flex flex-1 items-center justify-between bg-secondary px-4">
            <Heading title={headingText} />
            <Button onClick={signOut}>Sign Out</Button>
        </div>
    );
}
