/**
 * @jest-environment jsdom
 */
const { axe, toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)

it('should demonstrate this matcher`s usage', async () => {
    const render = () => `
    <div>
      <img src="#"/>
    </div>
    `

    // pass anything that outputs html to axe
    const html = render()
    expect(await axe(html)).toHaveNoViolations()
})