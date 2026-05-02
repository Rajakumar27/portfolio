import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ChevronDown, ExternalLink, LucideAngularModule, User, Github, Cpu, Layers, Database, Briefcase, Code, Layout, Linkedin, Twitter, Mail, Send, ArrowUpRight, X, Menu, Figma, Terminal , Globe , GraduationCap,ShoppingCart,Activity,ShieldCheck,Zap, Truck, Bus ,Users, MapPin} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ ChevronDown, ExternalLink, User, Github, Cpu, Layers, Database, Briefcase, Code, Layout, Linkedin, Twitter, Mail, Send, ArrowUpRight, X, Menu, Figma, Terminal, Globe, GraduationCap, ShoppingCart, Activity, ShieldCheck, Zap, Truck, Bus, Users, MapPin }))
  ]
};
