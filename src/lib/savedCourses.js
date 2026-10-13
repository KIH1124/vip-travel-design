import { useSyncExternalStore } from 'react'

/*
 * 담은 코스 — 이 기기(브라우저)의 localStorage 에만 저장합니다. 서버로 보내지 않습니다.
 * 키 이름은 기존 서비스와 같습니다. 저장 공간을 쓸 수 없는 환경(사생활 보호 모드 등)에서는
 * 이번 방문 동안만 메모리에 들고 있으며, persistent 로 그 상태를 알려 줍니다.
 */
const KEY = 'yeojeong:saved-courses'
const CHANGE = 'yeojeong:saved-change'

let persistent = true

function read() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : []
  } catch {
    persistent = false
    return []
  }
}

let cache = typeof window === 'undefined' ? [] : read()

function write(next) {
  cache = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
    persistent = true
  } catch {
    persistent = false
  }
  window.dispatchEvent(new Event(CHANGE))
}

function subscribe(callback) {
  // 다른 탭에서 바뀐 것도 반영합니다.
  const onStorage = (e) => {
    if (e.key === KEY || e.key === null) {
      cache = read()
      callback()
    }
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(CHANGE, callback)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CHANGE, callback)
  }
}

export function toggleSaved(slug) {
  write(cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug])
}

export function removeSaved(slug) {
  write(cache.filter((s) => s !== slug))
}

/** 담은 코스 slug 목록 (담은 순서) */
export function useSavedCourses() {
  const saved = useSyncExternalStore(subscribe, () => cache, () => [])
  return { saved, persistent }
}
