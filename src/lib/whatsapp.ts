/**
 * Génère un lien WhatsApp à partir d'un numéro de téléphone et d'un message optionnel
 * @param phoneNumber - Le numéro de téléphone (format international avec +)
 * @param message - Le message à pré-remplir (optionnel)
 * @returns Le lien WhatsApp
 */
export function generateWhatsAppLink(phoneNumber: string, message?: string): string {
  // Nettoyer le numéro de téléphone (enlever les espaces et caractères spéciaux)
  const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/[-()+]/g, '');
  
  // Construire l'URL de base
  const baseUrl = 'https://wa.me';
  
  // Construire le lien
  let whatsappUrl = `${baseUrl}/${cleanPhone}`;
  
  // Ajouter le message s'il existe
  if (message) {
    whatsappUrl += `?text=${encodeURIComponent(message)}`;
  }
  
  return whatsappUrl;
}
