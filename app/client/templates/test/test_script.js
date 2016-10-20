Template.test.helpers({


})

Template.test.events({

  'click button'(event) {
    let ripple = event.target.querySelector('.ripple')
    const target = event.target

    if (target.tagName.toLowerCase() !== 'button') return false
    const rect = target.getBoundingClientRect()

    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
      target.appendChild(ripple)
    }
    ripple.classList.remove('show')
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    ripple.classList.add('show')
    return false
  },


})

Template.test.onCreated(function () {


})

Template.test.onRendered(function () {


})
