"use client";

import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button as BaseButton, ButtonProps as BaseButtonProps } from "./button";

// Extended button variants for project-specific patterns
interface ExtendedButtonProps extends Omit<BaseButtonProps, 'variant'> {
  variant?: 
    | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'  // Base variants
    | 'primary-action'     // Main CTA buttons (Join, Submit)  
    | 'quantity-control'   // Increment/decrement buttons
    | 'cart-remove'        // Remove item buttons
    | 'floating-audio'     // Audio control button
    | 'transparent-border'; // Transparent with border
  icon?: 'arrow-right' | 'minus' | 'plus' | 'trash';
  loading?: boolean;
  loadingText?: string;
}

const extendedVariants = {
  'primary-action': "font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 px-6 py-3 text-[#202020]",
  'quantity-control': "w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-500 transition-colors bg-black/20",
  'cart-remove': "text-red-400 hover:text-red-300 transition-colors p-2",
  'floating-audio': "absolute bottom-8 right-8 w-16 h-16 bg-black/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-all duration-300 z-40",
  'transparent-border': "bg-transparent border border-white/60 hover:border-white hover:bg-white/10 text-white transition-all duration-300 rounded-lg px-6 py-2"
};

const iconComponents = {
  'arrow-right': ArrowRight,
  'minus': Minus,
  'plus': Plus,
  'trash': Trash2,
};

export default function ProjectButton({
  variant,
  icon,
  loading = false,
  loadingText,
  children,
  className,
  disabled,
  ...props
}: ExtendedButtonProps) {
  // Use base UI button for standard variants
  const isBaseVariant = !variant || ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(variant);
  
  if (isBaseVariant) {
    const IconComponent = icon ? iconComponents[icon] : null;
    return (
      <BaseButton
        variant={variant as any}
        disabled={disabled || loading}
        className={className}
        {...props}
      >
        {loading ? (
          <span className="animate-pulse">{loadingText || 'Loading...'}</span>
        ) : (
          <span className="flex items-center justify-center">
            {children}
            {IconComponent && <IconComponent className="h-4 w-4 ml-2" />}
          </span>
        )}
      </BaseButton>
    );
  }

  // Use custom styling for project-specific variants
  const IconComponent = icon ? iconComponents[icon] : null;
  const variantClass = extendedVariants[variant as keyof typeof extendedVariants];

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        variantClass,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse">{loadingText || 'Loading...'}</span>
      ) : (
        <span className="flex items-center justify-center">
          {children}
          {IconComponent && <IconComponent className="h-4 w-4 ml-2" />}
        </span>
      )}
    </button>
  );
}

// Specific button components for common patterns
export function SubmitButton({ 
  loading, 
  loadingText = "Joining...", 
  children = "Join",
  ...props 
}: Omit<ExtendedButtonProps, 'variant'>) {
  return (
    <ProjectButton
      type="submit"
      variant="primary-action"
      icon="arrow-right"
      loading={loading}
      loadingText={loadingText}
      {...props}
    >
      {children}
    </ProjectButton>
  );
}

export function QuantityButton({ 
  operation, 
  ...props 
}: Omit<ExtendedButtonProps, 'variant' | 'icon'> & { operation: 'increase' | 'decrease' }) {
  return (
    <ProjectButton
      variant="quantity-control"
      icon={operation === 'increase' ? 'plus' : 'minus'}
      {...props}
    />
  );
}

export function RemoveButton(props: Omit<ExtendedButtonProps, 'variant' | 'icon'>) {
  return (
    <ProjectButton
      variant="cart-remove"
      icon="trash"
      {...props}
    />
  );
}

export function FloatingAudioButton(props: Omit<ExtendedButtonProps, 'variant'>) {
  return (
    <ProjectButton
      variant="floating-audio"
      {...props}
    />
  );
}