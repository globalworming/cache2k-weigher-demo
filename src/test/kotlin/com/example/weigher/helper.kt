package com.example.weigher

import com.example.weigher.model.Animal
import com.example.weigher.model.Elephant
import org.cache2k.Cache
import java.util.*

fun randomKey() = UUID.randomUUID().toString()

fun containsElephant(cache: Cache<String, Animal>): Boolean =
    cache.entries().iterator().asSequence().firstOrNull { it.value is Elephant } != null
