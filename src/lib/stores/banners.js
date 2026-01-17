import { writable, derived } from 'svelte/store';

export const bannerPositions = {
  TOP: 'top'
};

export const activeBanners = writable({
  [bannerPositions.TOP]: null
});

export const allBanners = writable([
  {
    id: 1,
    position: bannerPositions.TOP,
    title: 'Win iPhone 17 Gift Card',
    content: `<a href='https://dimentionful.com/?a=5354&oc=24810&c=64703&m=7&s1=fire' target='_blank' rel='noopener noreferrer nofollow' style='display:block;text-decoration:none;color:inherit;'>\
      <div style="box-sizing:border-box;width:728px;height:120px;font-family:Arial, Helvetica, sans-serif;display:flex;border-radius:4px;overflow:hidden;">\
        <div style="background:#000;flex:0 0 400px;display:flex;align-items:center;justify-content:center;padding:8px;">\
          <img src='https://i.gyazo.com/84bd3d442f1bfaeebb6e75eca21d0b9d.png' alt='iPhone 17' style='max-width:100%;max-height:100%;object-fit:contain;'/>\
        </div>\
        <div style="background:#e8e7e5;flex:1;padding:8px 12px;display:flex;flex-direction:column;justify-content:center;">\
          <div style="font-size:9px;color:#666;margin-bottom:6px;font-style:italic;line-height:1.2;">Offer not sponsored-endorsed by this brand.</div>\
          <div style="font-size:13px;font-weight:700;color:#000;line-height:1.3;">\
            Shop, Play & Earn Rewards! 🎉<br/>\
            Get Up To $1000 Towards the new iPhone 17🎁\
          </div>\
          <div style="font-size:11px;font-weight:600;color:#000;margin-top:4px;">Be quick because supplies are limited!</div>\
        </div>\
      </div>\
    </a>`,
    size: '728x120',
    isActive: true,
    startDate: new Date().toISOString(),
    endDate: null,
    priority: 1
  }
]);

export function setBanner(position, bannerContent) {
  activeBanners.update(current => ({ ...current, [position]: bannerContent }));
}

export const getBanner = derived(activeBanners, $activeBanners => position => $activeBanners[position]);

export function activateById(id) {
  let selected = null;
  allBanners.update(list => {
    list.forEach(b => {
      if (b.id === id) selected = b;
    });
    return list;
  });
  if (selected) setBanner(selected.position, selected.content);
}

export function rotateBanners(interval = 30000) {
  return setInterval(() => {
    allBanners.update(list => {
      const active = list.filter(b => b.isActive && b.position === bannerPositions.TOP);
      if (active.length > 0) {
        const pick = active[Math.floor(Math.random() * active.length)];
        setBanner(bannerPositions.TOP, pick.content);
      }
      return list;
    });
  }, interval);
}
