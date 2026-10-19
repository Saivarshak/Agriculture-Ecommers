import { Product } from '../types';

export interface ShopCategory {
  id: string;
  name: string;
  icon: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'seeds', name: 'Seeds', icon: 'seed' },
  { id: 'fertilizers', name: 'Fertilizers', icon: 'fertilizer' },
  { id: 'pesticides', name: 'Pesticides', icon: 'pesticide' },
  { id: 'equipment', name: 'Farm Equipment', icon: 'equipment' },
  { id: 'irrigation', name: 'Irrigation', icon: 'irrigation' },
  { id: 'tools', name: 'Tools & Accessories', icon: 'tools' },
  { id: 'animal_feed', name: 'Animal Feed', icon: 'feed' },
  { id: 'organic', name: 'Organic Products', icon: 'organic' }
];

export function productMatchesCategory(p: Product, catId: string): boolean {
  if (!catId || catId === 'all') return true;

  const pName = (p.name || '').toLowerCase();
  const pDesc = (p.description || '').toLowerCase();
  const pCert = (p.organicCertification || '').toLowerCase();
  const pCat = (p.category || '').toLowerCase();
  const pId = (p.id || '').toLowerCase();
  const lowerCat = catId.toLowerCase();

  switch (lowerCat) {
    case 'seeds':
      // Must not be chemical fertilizer, heavy equipment or chemical pesticide
      if (pId.includes('fertilizer') || pId.includes('pesticide') || pId.includes('equipment') || pId.includes('pump')) {
        return false;
      }
      if (
        pName.includes('fertilizer') ||
        pName.includes('urea') ||
        pName.includes('compost') ||
        pName.includes('tiller') ||
        pName.includes('pump') ||
        pName.includes('pesticide')
      ) {
        return false;
      }
      return (
        pName.includes('seed') ||
        pName.includes('paddy') ||
        pName.includes('wheat') ||
        pName.includes('maize') ||
        pName.includes('millet') ||
        pName.includes('sorghum') ||
        pName.includes('gram') ||
        pName.includes('bean') ||
        pName.includes('chana') ||
        pName.includes('lentil') ||
        pName.includes('ragi') ||
        pName.includes('bajra') ||
        pName.includes('jowar') ||
        pCat === 'cereals' ||
        pCat === 'pulses'
      );

    case 'fertilizers':
      return (
        pId.includes('fertilizer') ||
        pName.includes('fertilizer') ||
        pName.includes('urea') ||
        pName.includes('compost') ||
        pDesc.includes('fertilizer')
      );

    case 'pesticides':
      return (
        pId.includes('pesticide') ||
        pName.includes('pesticide') ||
        pName.includes('neem') ||
        pDesc.includes('pesticide') ||
        pDesc.includes('pest repellent')
      );

    case 'equipment':
      return (
        pId.includes('equipment') ||
        pName.includes('tiller') ||
        pName.includes('tractor') ||
        pName.includes('equipment') ||
        pDesc.includes('power tiller') ||
        pDesc.includes('machinery') ||
        pCert.includes('equipment')
      );

    case 'irrigation':
      return (
        pId.includes('irrigation') ||
        pName.includes('pump') ||
        pName.includes('irrigation') ||
        pDesc.includes('irrigation') ||
        (pName.includes('water') && !pName.includes('watermelon'))
      );

    case 'tools':
      return (
        pId.includes('tool') ||
        pId.includes('equipment') ||
        pName.includes('tool') ||
        pName.includes('tiller') ||
        pName.includes('pump') ||
        pDesc.includes('rotary blades') ||
        pDesc.includes('tilling') ||
        pCert.includes('equipment')
      );

    case 'animal_feed':
      return (
        pName.includes('feed') ||
        pName.includes('oats') ||
        pName.includes('maize') ||
        pName.includes('sorghum') ||
        pName.includes('pearl millet') ||
        pName.includes('finger millet') ||
        pName.includes('foxtail millet') ||
        pName.includes('little millet')
      );

    case 'organic':
      return (
        pCert.includes('organic') ||
        pCert.includes('jaivik') ||
        pName.includes('organic') ||
        pDesc.includes('organic')
      );

    default:
      return pCat === lowerCat || p.categoryId === catId;
  }
}

export function smoothScrollToCategory(catId: string | null) {
  const targetId = catId ? `category-${catId}` : 'featured-catalog';
  const element = document.getElementById(targetId) || document.getElementById('featured-catalog');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function smoothScrollToItem(itemId?: string, retryCount = 0): boolean {
  if (itemId) {
    const cardEl = document.getElementById(`product-card-${itemId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Reset highlight then apply smooth ring focus
      cardEl.classList.remove('ring-4', 'ring-[#007a4d]', 'ring-offset-2', 'scale-[1.02]');
      void cardEl.offsetWidth;
      cardEl.classList.add('ring-4', 'ring-[#007a4d]', 'ring-offset-2', 'scale-[1.02]', 'transition-all', 'duration-300');
      setTimeout(() => {
        cardEl.classList.remove('ring-4', 'ring-[#007a4d]', 'ring-offset-2', 'scale-[1.02]');
      }, 2500);
      return true;
    } else if (retryCount < 3) {
      setTimeout(() => {
        smoothScrollToItem(itemId, retryCount + 1);
      }, 120);
      return false;
    }
  }
  const catalogEl = document.getElementById('featured-catalog');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }
  return false;
}
