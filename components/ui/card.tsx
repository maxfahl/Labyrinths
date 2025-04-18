import { cn } from "@/lib/utils";
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div data-slot="card" className={cn("rounded-xl bg-card text-card-foreground shadow", className)} {...props} />
);

export const CardHeader: React.FC<CardProps> = ({ className, ...props }) => (
  <div data-slot="card-header" className={cn("flex flex-col gap-1.5 px-6 pt-6", className)} {...props} />
);

export const CardFooter: React.FC<CardProps> = ({ className, ...props }) => (
  <div data-slot="card-footer" className={cn("px-6 pb-6 pt-2", className)} {...props} />
);

export const CardTitle: React.FC<CardProps> = ({ className, ...props }) => (
  <h3 data-slot="card-title" className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);

export const CardAction: React.FC<CardProps> = ({ className, ...props }) => (
  <div data-slot="card-action" className={cn("flex items-center gap-2 px-6 pb-6 pt-2", className)} {...props} />
);

export const CardDescription: React.FC<CardProps> = ({ className, ...props }) => (
  <p data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
);

export const CardContent: React.FC<CardProps> = ({ className, ...props }) => (
  <div data-slot="card-content" className={cn("px-6", className)} {...props} />
);

