package com.example.weigher

import com.example.weigher.model.Animal
import org.cache2k.Cache
import org.cache2k.Cache2kBuilder
import org.cache2k.CacheEntry
import org.cache2k.event.CacheEntryCreatedListener
import org.cache2k.event.CacheEntryEvictedListener
import org.cache2k.extra.spring.SpringCache2kCacheManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.interceptor.SimpleKey
import org.springframework.context.annotation.Bean
import org.springframework.messaging.simp.SimpMessagingTemplate
import java.util.function.Function


@EnableCaching
@SpringBootApplication
open class WeigherExampleApplication {

  @Autowired
  lateinit var template: SimpMessagingTemplate

  @Bean
  open fun cacheManager(): CacheManager {
    return SpringCache2kCacheManager("spring-${hashCode()}")
        .addCaches(
            Function {
              @Suppress("UNCHECKED_CAST")
              (it.name("exhibit") as Cache2kBuilder<SimpleKey, Animal>)
                  .weigher { _, value -> value.size }
                  .maximumWeight(50)
                  .addListener(object: CacheEntryEvictedListener<SimpleKey, Animal> {
                    override fun onEntryEvicted(cache: Cache<SimpleKey, Animal>, entry: CacheEntry<SimpleKey, Animal>) {
                      template.convertAndSend("/topic/evicted", "${entry.value.name} ${entry.value.size}")
                      template.convertAndSend("/topic/update", "new data available")

                    }
                  })
                  .addListener(object: CacheEntryCreatedListener<SimpleKey, Animal> {
                    override fun onEntryCreated(cache: Cache<SimpleKey, Animal>, entry: CacheEntry<SimpleKey, Animal>) {
                      template.convertAndSend("/topic/update", "new data available")
                    }
                  })
                  .enableJmx(true)
            }

        )
  }

  companion object {
    @JvmStatic
    fun main(args: Array<String>) {
      runApplication<WeigherExampleApplication>(*args)
    }
  }
}
