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
    title: 'Win Mystery Travel Box',
    content: `<a href='https://www.rivoweb.com/26NZT9X2/7HZ6995M/?source_id=firetempmail' target='_blank' rel='noopener noreferrer nofollow' style='display:block;text-decoration:none;color:inherit;'>\
      <div class="email-container" style="box-sizing:border-box;width:728px;height:120px;display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:linear-gradient(180deg,#3a8dee,#cfe3ff);font-family:Arial, Helvetica, sans-serif;color:#000;">\
        <div style='display:flex;align-items:center;gap:12px;min-width:260px;'>\
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Booking.com_Logo.svg/1200px-Booking.com_Logo.svg.png' alt='Booking' style='height:56px;display:block;'/>\
          <div style='line-height:1;display:flex;flex-direction:column;'>\
            <div style='font-weight:700;color:#002b5b;font-size:14px;text-transform:uppercase'>WIN A</div>\
            <div style='font-size:20px;font-weight:900;font-style:italic;color:#000;letter-spacing:0.3px;margin-top:2px;'>MYSTERY TRAVEL BOX</div>\
            <div style='font-size:12px;color:#333;margin-top:4px;font-style:italic;'>Enter for your chance to win — it's free</div>\
          </div>\
        </div>\
        <div style='display:flex;align-items:center;gap:12px;'>\
          <img src='https://goimgweb.com/file_a103313c-e05e-4a73-b764-059b83d3f074.png' alt='Mystery Travel Box' style='height:72px;display:block;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.12);'/>\
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
