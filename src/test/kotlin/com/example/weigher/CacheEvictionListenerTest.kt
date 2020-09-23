package com.example.weigher

import com.example.weigher.model.Animal
import com.example.weigher.model.Cat
import com.example.weigher.model.Elephant
import org.cache2k.Cache
import org.cache2k.Cache2kBuilder
import org.cache2k.CacheEntry
import org.cache2k.event.CacheEntryEvictedListener
import org.hamcrest.MatcherAssert.*
import org.hamcrest.Matchers.*
import org.junit.Test
import java.util.*

class CacheEvictionListenerTest {

  @Test
  fun `test eviction listener`() {

    var notified = false;

    val cache = object : Cache2kBuilder<String, Animal>() {}
        .entryCapacity(10)
        .addListener(object: CacheEntryEvictedListener<String, Animal> {
          override fun onEntryEvicted(p0: Cache<String, Animal>?, p1: CacheEntry<String, Animal>?) {
            notified = true
          }
        })
        .build()

    repeat(10) {
      cache.put(randomKey(), Cat())
    }
    cache.put(randomKey(), Cat())
    assertThat(notified, `is`(true))
  }


}

