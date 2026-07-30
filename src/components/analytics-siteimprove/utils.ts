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
  // Siteimprove only loads after statistics consent; without it `_sz` is undefined and
  // events are silently dropped.
  if (window._sz === undefined) {
    return;
  }

  if (label) {
    window._sz.push(['event', category, action, label]);
  } else {
    window._sz.push(['event', category, action]);
  }
};
