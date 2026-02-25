import React from 'react';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'hover';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-bg-secondary border border-border-light shadow-sm hover:shadow-md',
  glass: 'bg-glass-light backdrop-blur-glass border border-glass-medium shadow-glass hover:shadow-xl',
  elevated: 'bg-bg-secondary border border-border-medium shadow-md hover:shadow-lg',
  hover: 'bg-bg-secondary border border-border-light shadow-sm hover:shadow-lg hover:border-primary hover:bg-bg-tertiary',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-normal ease-out';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/* Card child components for composition */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-b border-border-light ${className}`} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`} {...props} />
  )
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-border-light bg-bg-tertiary rounded-b-lg ${className}`} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
