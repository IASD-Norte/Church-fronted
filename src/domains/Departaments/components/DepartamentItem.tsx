// components/department/DepartmentItem.tsx
import { Link } from 'react-router-dom'; // o 'next/link' si usas Next.js
import { cn } from '@/shared/lib/utils'; // ajusta según tu utilidad de clases

interface DepartmentItemProps {
  title: string;
  to: string;
}

export function DepartmentItem({ title, to }: DepartmentItemProps) {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors',
          'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          'text-foreground'
        )}
      >
        {title}
      </Link>
    </li>
  );
}