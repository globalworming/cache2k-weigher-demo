package com.example.weigher

import com.example.weigher.model.Animal
import com.example.weigher.model.Cat
import com.example.weigher.model.Elephant
import org.cache2k.Cache
import org.cache2k.Cache2kBuilder
import org.hamcrest.MatcherAssert.*
import org.hamcrest.Matchers.*
import org.junit.Test
import java.util.*

class CacheLimitByEstimatedItemSizeTest {

  @Test
  fun `does limit by number of items work as i think it does`() {
    val cache = object : Cache2kBuilder<String, Animal>() {}
        .entryCapacity(10)
        .build()

    repeat(10) {
      cache.put(randomKey(), Cat())
    }
    assertThat(cache.keys().count(), `is`(10))

    cache.put(randomKey(), Cat())
    assertThat(cache.keys().count(), `is`(10))
  }

  @Test
  fun `try that with a weigher`() {
    val cache = object : Cache2kBuilder<String, Animal>() {}
        .maximumWeight(10)
        .weigher { _, animal -> animal.size }.build()

    repeat(10) {
      cache.put(randomKey(), Cat())
    }
    assertThat(cache.keys().count(), `is`(10))

    cache.put(randomKey(), Cat())
    assertThat(cache.keys().count(), `is`(10))
  }

  @Test
  fun `mix sizes, start with elephant`() {
    val cache = object : Cache2kBuilder<String, Animal>() {}
        .maximumWeight(10)
        .weigher { _, animal -> animal.size }.build()

    cache.put(randomKey(), Elephant())
    cache.put(randomKey(), Cat())
    assertThat(cache.keys().count(), `is`(2))
    assertThat(containsElephant(cache), `is`(true))

    cache.put(randomKey(), Cat())
    assertThat(cache.keys().count(), `is`(2))
    assertThat(containsElephant(cache), `is`(false))
  }


  @Test
  fun `only elephants`() {
    val cache = object : Cache2kBuilder<String, Animal>() {}
        .maximumWeight(10)
        .weigher { _, animal -> animal.size }.build()

    cache.put(randomKey(), Elephant())
    cache.put(randomKey(), Elephant())
    cache.put(randomKey(), Elephant())
    cache.put(randomKey(), Elephant())

    // may be fine, is mentioned in the docs
    assertThat(cache.keys().count(), `is`(2))

    cache.put(randomKey(), Cat())
    cache.put(randomKey(), Cat())
    cache.put(randomKey(), Cat())
    assertThat(cache.keys().count(), `is`(2))
  }


  @Test
  fun `mix sizes, start with cat, but more capacity`() {
    val cache = object : Cache2kBuilder<String, Animal>() {}
        .maximumWeight(100)
        .weigher { _, animal -> animal.size }.build()

    repeat (10) {
      cache.put(randomKey(), Cat())
      cache.put(randomKey(), Elephant())
    }
    // i would expect 10 cats at some point
    assertThat(cache.keys().count(), `is`(20))

    cache.put(randomKey(), Cat())
    cache.put(randomKey(), Elephant())

    assertThat(cache.keys().count(), `is`(20))

    // yeah looks better this way
  }

}

