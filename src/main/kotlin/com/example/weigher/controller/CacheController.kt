package com.example.weigher.controller

import com.example.weigher.model.Animal
import com.example.weigher.model.Capacity
import org.cache2k.Cache
import org.cache2k.core.InternalCache
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.CacheManager
import org.springframework.cache.interceptor.SimpleKey
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class CacheController {

  @Autowired
  private lateinit var cacheManager: CacheManager

  @GetMapping("/api/cache/entries")
  fun cacheContents() =
      cache2k().entries()
          .map { it.value }
          .toList()

  @PutMapping("/api/cache/capacity")
  fun setCapacity(@RequestBody capacity: Capacity): Capacity {
    val cache = cache2kInternal()
    cache.eviction.changeCapacity(capacity.limit)
    return Capacity(cache.latestInfo.maximumWeight)
  }

  @GetMapping("/api/cache/capacity")
  fun getCapacity(): Capacity = Capacity(cache2kInternal().latestInfo.maximumWeight)

  @DeleteMapping("/api/cache/entries")
  fun clear() = cacheManager.getCache("exhibit")!!.clear()

  @GetMapping("/api/cache/statistics")
  fun statistics()= cache2k().statistics

  @GetMapping("/api/cache/internalStatistics")
  fun internalStatistics() = cache2kInternal().info.toString()

  @Suppress("UNCHECKED_CAST")
  private fun cache2k() = cacheManager.getCache("exhibit")!!
      .nativeCache as Cache<SimpleKey, Animal>

  @Suppress("UNCHECKED_CAST")
  private fun cache2kInternal() = cacheManager.getCache("exhibit")!!
      .nativeCache as InternalCache<SimpleKey, Animal>

}