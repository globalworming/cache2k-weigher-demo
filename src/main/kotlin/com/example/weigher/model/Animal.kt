package com.example.weigher.model

open class Animal(open val name:String, val size: Int) {

  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other !is Animal) return false

    if (name != other.name) return false
    if (size != other.size) return false

    return true
  }

  override fun hashCode(): Int {
    var result = name.hashCode()
    result = 31 * result + size
    return result
  }
}