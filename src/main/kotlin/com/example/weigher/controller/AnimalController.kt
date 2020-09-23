package com.example.weigher.controller

import com.example.weigher.model.Animal
import com.example.weigher.model.Cat
import com.example.weigher.model.Elephant
import org.springframework.cache.annotation.Cacheable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
open class AnimalController {

  @GetMapping("/api/animal")
  fun animal(@RequestParam type: String, @RequestParam name: String)= exhibit(type, name)

  @Cacheable("exhibit")
  open fun exhibit(type: String, name: String): Animal {
    return buildAnimal(type, name)
  }

  private fun buildAnimal(type: String, name: String): Animal {
    return when (type) {
      "elephant" -> Elephant(name)
      "cat" -> Cat(name)
      "camel" -> Cat(name)
      else -> TODO()
    }
  }
}