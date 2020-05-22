import config from '../data/config'
export default class Radio extends Phaser.GameObjects.Container {
  constructor (scene, x, y, list) {
    super(scene, x, y)
    this.scene = scene
    this.rows = list.map(v => this.getRow(v))
    this.rows.reduce((newX, v) => {
      v.setPosition(newX + v.width.half, 0)
      return v.x + v.width.half + 40
    }, 0)
    this.add(this.rows)
    this.setValue(list[0])
  }
  getRow (value) {
    const container = this.scene.add.container(0, 0)
    container.value = value
    const label = this.scene.add.text(13, 0, value, { align: 'center', fontSize: 18, fontFamily: config.FONTS.UI }).setOrigin(0.5, 0.5)
    const circleBg = this.scene.add.circle(-label.width.half - 5, 0, 9, config.COLORS.ghost)
    const circleValue = this.scene.add.circle(-label.width.half - 5, 0, 6, config.COLORS.theme)
    container.radio = circleValue
    container.setSize(label.width + 32, 25)
    container.add([circleBg, circleValue, label])
    container.setInteractive().on('pointerdown', () => {
      this.scene.audio.se('click')
      this.setValue(value)
    })
    return container
  }
  setValue (value) {
    this.rows.forEach(row => {
      row.value === value ? row.radio.setFillStyle(config.COLORS.theme, 1) : row.radio.setFillStyle(config.COLORS.dark, 0.5)
    })
  }
}
