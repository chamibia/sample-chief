// Core UI Components - Consolidated exports
export { LazyComponent,default as LazyMedia, LazyVideo, LazyVideoHero } from './LazyMedia';
export { HeroBackgroundImage,default as OptimizedImage, ProductCardImage, ProjectCardImage } from './OptimizedImage';
export { createPageMetadata,default as PageLayout } from './PageLayout';
export { FloatingAudioButton,default as ProjectButton, QuantityButton, RemoveButton, SubmitButton } from './ProjectButton';
export { EventCard,ProductCard, ProjectCard, default as UnifiedCard } from './UnifiedCard';

// Re-export base UI components
export { Button } from './button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
export { Input } from './input';
export { Label } from './label';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// Re-export form components
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

// Re-export navigation
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from './navigation-menu';

// Note: Carousel components require client-side usage only
// export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './carousel';
// export { default as CarouselProgressBar } from './carousel-progress-bar';