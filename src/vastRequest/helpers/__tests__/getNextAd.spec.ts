import {getAds, isPodAd} from '../../../vastSelectors'
import type {ParsedXML} from '../../../types'
import {
  wrapperParsedXML,
  podParsedXML,
  waterfallParsedXML,
  wrapperAd
} from '../../../../fixtures'
import {getNextAd} from '../getNextAd'
import {markAdAsRequested, unmarkAdAsRequested} from '../adUtils'

const markAdsAsRequested = (parsedXml: ParsedXML): void => {
  getAds(parsedXml).forEach(markAdAsRequested)
}

const unmarkAdsAsRequested = (parsedXml: ParsedXML): void => {
  getAds(parsedXml).forEach(unmarkAdAsRequested)
}

test('getNextAd must return undefined if there is no next ad definition in the waterfall', () => {
  markAdAsRequested(wrapperAd)

  expect(
    getNextAd(
      {
        ad: wrapperAd,
        parsedXML: wrapperParsedXML
      } as any,
      {}
    )
  ).toBeUndefined()

  markAdsAsRequested(waterfallParsedXML)

  const waterfallAds = getAds(waterfallParsedXML)

  expect(
    getNextAd(
      {
        ad: waterfallAds[0],
        parsedXML: waterfallParsedXML
      } as any,
      {}
    )
  ).toBeUndefined()

  unmarkAdsAsRequested(waterfallParsedXML)
  unmarkAdAsRequested(wrapperAd)
})

test('getNextAd must get the next available ad definition if fallbackOnNoAd is true', () => {
  const waterfallAds = getAds(waterfallParsedXML)

  markAdAsRequested(waterfallAds[0])

  expect(
    getNextAd(
      {
        ad: waterfallAds[0],
        parsedXML: waterfallParsedXML
      } as any,
      {fallbackOnNoAd: true}
    )
  ).toBe(waterfallAds[1])

  unmarkAdAsRequested(waterfallAds[0])
})

test('getNextAd must return undefined if fallbackOnNoAd is false', () => {
  const waterfallAds = getAds(waterfallParsedXML)

  expect(
    getNextAd(
      {
        ad: waterfallAds[0],
        parsedXML: waterfallParsedXML
      } as any,
      {fallbackOnNoAd: false}
    )
  ).toBeUndefined()
})

test('getNextAd must get the next ad definition on the ad Pod sequence', () => {
  const ads = getAds(podParsedXML)
  const podAds = ads.filter(isPodAd)

  markAdAsRequested(podAds[0])

  expect(
    getNextAd(
      {
        ad: podAds[0],
        parsedXML: podParsedXML
      } as any,
      {}
    )
  ).toBe(podAds[1])

  unmarkAdAsRequested(podAds[0])
})

test('getNextAd must return undefined if there is no next pod in the ad pod sequence', () => {
  const ads = getAds(podParsedXML)
  const podAds = ads.filter(isPodAd)

  markAdsAsRequested(podParsedXML)

  expect(
    getNextAd(
      {
        ad: podAds[0],
        parsedXML: podParsedXML
      } as any,
      {}
    )
  ).toBeUndefined()

  unmarkAdsAsRequested(podParsedXML)
})

test('getNextAd with useAdBuffet option flag set to true must get an ad definition from the adBuffet of the adPod', () => {
  const ads = getAds(podParsedXML)
  const podAds = ads.filter(isPodAd)
  const buffetAds = ads.filter((ad) => !isPodAd(ad))

  markAdAsRequested(podAds[0])

  expect(
    getNextAd(
      {
        ad: podAds[0],
        parsedXML: podParsedXML
      } as any,
      {useAdBuffet: true}
    )
  ).toBe(buffetAds[0])

  unmarkAdAsRequested(podAds[0])
})

test('getNextAd with useAdBuffet option flag set to true must get the next ad definition on the adPod sequence if there are no more adBuffets to serve', () => {
  const ads = getAds(podParsedXML)
  const podAds = ads.filter(isPodAd)
  const buffetAds = ads.filter((ad) => !isPodAd(ad))

  markAdAsRequested(podAds[0])
  markAdAsRequested(buffetAds[0])

  expect(
    getNextAd(
      {
        ad: podAds[0],
        parsedXML: podParsedXML
      } as any,
      {useAdBuffet: true}
    )
  ).toBe(podAds[1])

  unmarkAdAsRequested(podAds[0])
  unmarkAdAsRequested(buffetAds[0])
})
