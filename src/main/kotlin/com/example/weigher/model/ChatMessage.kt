package com.example.weigher.model

import java.util.*

class ChatMessage {
  var type: MessageType? = null
  var content: String? = null
  var sender: String? = null

  enum class MessageType {
    CHAT, JOIN, LEAVE
  }

  override fun equals(o: Any?): Boolean {
    if (this === o) return true
    if (o == null || javaClass != o.javaClass) return false
    val that = o as ChatMessage
    return type == that.type &&
        content == that.content &&
        sender == that.sender
  }

  override fun hashCode(): Int {
    return Objects.hash(type, content, sender)
  }

  override fun toString(): String {
    return "ChatMessage{" +
        "type=" + type +
        ", content='" + content + '\'' +
        ", sender='" + sender + '\'' +
        '}'
  }

  companion object {
    fun join(name: String?): ChatMessage {
      val chatMessage = ChatMessage()
      chatMessage.sender = name
      chatMessage.type = MessageType.JOIN
      return chatMessage
    }

    fun chat(name: String?, content: String?): ChatMessage {
      val chatMessage = ChatMessage()
      chatMessage.type = MessageType.CHAT
      chatMessage.sender = name
      chatMessage.content = content
      return chatMessage
    }
  }
}