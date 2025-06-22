import React from 'react';
import { Loader } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SpinnerSizeProps } from '@/types/type';

const spinnerVariants = cva(
    'text-muted-foreground animate-spin ',
    {
        variants: {
            size: {
                default: 'h-4 w-4',
                sm: 'h-2 w-2',
                lg: 'h-6 w-6',
                icon: 'h-10 w-10'
            },
            color : {
                default : "text-[#F0F0EB]",
                primary : "text-[#58A1A4]",
                white : "text-[#fff]"
            }
        },
        defaultVariants: {
            size: 'default',
            color : "default"
        },
        
    }
);


/**
 * Spinner component for loading states.
 *
 * @param size - Size of the spinner (default, sm, lg, icon)
 * @param color - Color variant of the spinner (default, primary, white)
 *
 * @example
 * <Spinner size="lg" color="primary" />
 */

const Spinner: React.FC<SpinnerSizeProps> = ({ size = 'default' , color = "default"}) => {
    
    return (
        <Loader className={cn(spinnerVariants({ size , color}))} />
    );
};

export default Spinner;
