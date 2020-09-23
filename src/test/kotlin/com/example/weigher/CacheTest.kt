package com.example.weigher

import com.example.weigher.controller.AnimalController
import com.example.weigher.controller.CacheController
import com.example.weigher.model.Cat
import org.hamcrest.MatcherAssert.*
import org.hamcrest.core.IsCollectionContaining
import org.hamcrest.core.IsIterableContaining
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.junit4.SpringRunner


@RunWith(SpringRunner::class)
@DirtiesContext
@SpringBootTest
class CacheTest {

  @Autowired
  lateinit var animalController: AnimalController

  @Autowired
  lateinit var cacheController: CacheController

  @Test
  fun `after requesting an animal, the exhibit cache should contain it`() {
    animalController.exhibit("cat", "mimi")
    assertThat(cacheController.cacheContents(), IsIterableContaining.hasItem(Cat("mimi")))
  }

  @Test
  fun `reproduce NPE after clearing the cache`() {
    var i = 0
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("elephant", i++.toString())
    animalController.exhibit("cat", i++.toString())
    animalController.exhibit("cat", i++.toString())
    animalController.exhibit("cat", i++.toString())
    animalController.exhibit("cat", i++.toString())
    animalController.exhibit("cat", i++.toString())
    animalController.exhibit("cat", i++.toString())
    cacheController.clear()
    animalController.exhibit("cat", i.toString())

  }


}