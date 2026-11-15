import {
  Mail, Clock, Zap, Shield, BarChart3, Users, MessageSquare,
  Star, Globe, Settings, TrendingUp, Send, Bell, Smartphone,
  FileText, CreditCard, Award, Headphones, Lock, Layers,
  CalendarCheck, ShoppingBag, Plug, Check, Filter, MessageCircle,
  LogIn, LogOut, AlertTriangle, Phone, Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Icônes que le JSON d'une page d'atterrissage peut nommer. Importées une à une : les sections sont des
 * composants serveur, seules les icônes rendues finissent dans le HTML. Un nom inconnu n'affiche rien.
 */
const icons: Record<string, LucideIcon> = {
  Mail, Clock, Zap, Shield, BarChart3, Users, MessageSquare,
  Star, Globe, Settings, TrendingUp, Send, Bell, Smartphone,
  FileText, CreditCard, Award, Headphones, Lock, Layers,
  CalendarCheck, ShoppingBag, Plug, Check, Filter, MessageCircle,
  LogIn, LogOut, AlertTriangle, Phone, Building2,
};

export function getLPIcon(name: string | undefined): LucideIcon | null {
  return name ? icons[name] ?? null : null;
}
