export enum EventCategory {
  DETAILS_PAGE = 'Details page'
}

export enum EventAction {
  REQUEST_ACCESS = 'Request access'
}

type SiteImproveEventProps = {
  category: EventCategory;
  action: EventAction;
  label?: string | undefined;
};

export const trackSiteImproveEvent = ({
  category,
  action,
  label
}: SiteImproveEventProps) => {
  if (window._sz === undefined) {
    // eslint-disable-next-line no-console
    console.error('Unable to find Site Improve event library.');
  }

  if (label) {
    window._sz.push(['event', category, action, label]);
  } else {
    window._sz.push(['event', category, action]);
  }
};
