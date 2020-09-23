package com.example.weigher

import com.example.weigher.controller.CacheController
import org.hamcrest.CoreMatchers.*
import org.hamcrest.MatcherAssert.*
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@DirtiesContext
@SpringBootTest
class CacheStatisticsTest {

  @Autowired lateinit var cacheController: CacheController

  @Test
  fun getStatistics() {
    cacheController.clear()
    assertThat(cacheController.statistics().clearCount, `is`(1L))
  }

  @Test
  fun getInternalStatistics() {
    cacheController.clear()
    val actual = cacheController.internalStatistics()
    assertThat(actual, not(`is`(nullValue())))
    println(actual)
  }
}

