import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
export const TIMEFORMAT = 'YYYY/MM/DD, HH:mm:ss';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

/**
 * Formats license field for webui.
 * @see https://docs.npmjs.com/files/package.json#license
 */
export function licenseFomratter(license) {
  if (isString(license)) {
    return license;
  }

  if (isObject(license)) {
    return license.type;
  }

  return null;
}

/**
 * Formats repository field for webui.
 * @see https://docs.npmjs.com/files/package.json#repository
 */
export function repositoryFormatter(repository) {
  if (isString(repository)) {
    return repository;
  }

  if (isObject(repository)) {
    return repository.url;
  }

  return null;
}


/**
 * Formats repository field for webui.
 * @see https://docs.npmjs.com/files/package.json#repository
 */
export function authorFormatter(author) {
    if (isString(author)) {
        return author;
    }

    if (isObject(author)) {
        return author.name;
    }

    return null;
}

/**
 * For <LastSync /> component
 * @param {array} uplinks
 */
export function getLastUpdatedPackageTime(uplinks = {}) {
  let lastUpdate = 0;
  Object.keys(uplinks).forEach((upLinkName) => {
    const status = uplinks[upLinkName];
    if (status.fetched > lastUpdate) {
      lastUpdate = status.fetched;
    }
  });

  return lastUpdate ? formatDate(lastUpdate) : '';
}

/**
 * For <LastSync /> component
 * @param {array} time
 */
export function getRecentReleases(time = {}) {
  const recent = Object.keys(time).map((version) => ({
    version,
    time: formatDate(time[version])
  }));
  return recent.slice(recent.length - 3, recent.length).reverse();
}


export function formatDate(lastUpdate) {
  return format(new Date(lastUpdate), TIMEFORMAT);
}

export function formatDateDistance(lastUpdate) {
  return distanceInWordsToNow(new Date(lastUpdate));
}
