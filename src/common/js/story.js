export default class Story {
  constructor ({ id, image, singer, name, duration, url }) {
    this.id = id
    this.image = image
    this.singer = singer
    this.name = name
    this.duration = duration
    this.url = url
  }
}

export function createStory (musicData) {
  return new Story({
    id: musicData.id,
    image: musicData.image,
    singer: musicData.singer,
    name: musicData.name,
    duration: musicData.duration,
    url: musicData.url
  })
}
