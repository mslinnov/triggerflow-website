/**
 * Attributs d'un lien de page d'atterrissage. Un lien externe (la démo lemcal) s'ouvre dans un nouvel
 * onglet ; une ancre ou une page du site reste dans l'onglet, pour que le visiteur payé ne se retrouve
 * pas avec deux onglets ouverts.
 */
export function lpLinkProps(href: string): { target?: string; rel?: string } {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
