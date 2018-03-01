/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global describe, it, before */
const assert = require('assert')

const fakeElectron = require('../../../../../lib/fakeElectron')
require('../../../../../braveUnit')

describe('requestHandler unit test', function () {
  let requestHandler, parseFromStringHTML

  before(() => {
    global.chrome = {
      ipcRenderer: fakeElectron.ipcRenderer
    }

    global.DOMParser = class {
      parseFromString: () => parseFromStringHTML
    }
    requestHandler = require('../../../../../../../app/extensions/brave/content/scripts/requestHandler')
  })

  describe('getMetaData', function () {

  })

  describe('getData', function () {

  })

  describe('getImageRules', function () {

  })

  describe('getTitleRules', function () {

  })

  describe('getAuthorRules', function () {

  })

  describe('getText', function () {

  })

  describe('urlCheck', function () {

  })

  describe('getContent', function () {

  })

  describe('getSrc', function () {

  })

  describe('urlTest', function () {

  })

  describe('isEmpty', function () {

  })

  describe('isUrl', function () {

  })

  describe('getUrl', function () {

  })

  describe('strict', function () {

  })

  describe('titleize', function () {

  })

  describe('defaultFn', function () {

  })

  describe('getValue', function () {

  })

  describe('getThumbnailUrl', function () {
    it('null case', function () {
      const result = requestHandler.getThumbnailUrl()
      assert.equal(result, null)
    })

    it('id is passed in', function () {
      const result = requestHandler.getThumbnailUrl('ABC12302')
      assert.equal(result, `https://img.youtube.com/vi/ABC12302/sddefault.jpg`)
    })
  })

  describe('getVideoId', function () {
    it('null case', function () {
      const result = requestHandler.getVideoId()
      assert.deepEqual(result, {})
    })

    it('strip white space', function () {
      const result = requestHandler.getVideoId('   https://youtu.be/ABC12302    ')
      assert.deepEqual(result, {
        id: 'ABC12302',
        service: 'youtube'
      })
    })

    it('strip white space', function () {
      const result = requestHandler.getVideoId('   https://youtu.be/ABC12302    ')
      assert.deepEqual(result, {
        id: 'ABC12302',
        service: 'youtube'
      })
    })

    it('nocookie ', function () {
      const result = requestHandler.getVideoId('http://www.youtube-nocookie.com/ytscreeningroom?v=ABC12300')
      assert.deepEqual(result, {
        id: 'ABC12300',
        service: 'youtube'
      })
    })

    it('removes www', function () {
      const result = requestHandler.getVideoId('https://www.youtu.be/ABC12302')
      assert.deepEqual(result, {
        id: 'ABC12302',
        service: 'youtube'
      })
    })
  })

  // source https://github.com/radiovisual/get-video-id/blob/master/test.js
  describe('getYouTubeId', function () {
    it('null case', function () {
      const result = requestHandler.getYouTubeId()
      assert.equal(result, '')
    })

    it('gets metadata from youtube short code formats', () => {
      assert.equal(requestHandler.getYouTubeId('youtube://ABC12301'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('https://youtu.be/ABC12302'), 'ABC12302')
      assert.equal(requestHandler.getYouTubeId('http://youtu.be/ABC12303'), 'ABC12303')
      assert.equal(requestHandler.getYouTubeId('http://youtu.be/ABC12304?feature=youtube_gdata_player'), 'ABC12304')
    })

    it('handles youtube v= and vi= formats', () => {
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/ytscreeningroom?v=ABC1230'), 'ABC1230')
      assert.equal(requestHandler.getYouTubeId('https://www.youtube.com/watch?v=ABC12301'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12302&list=abc123&index=2&feature=plpp_video'), 'ABC12302')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12303&feature=channel'), 'ABC12303')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12304&playnext_from=TL&videos=abc123&feature=sub'), 'ABC12304')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12305&feature=channel'), 'ABC12305')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12306&playnext_from=TL&videos=abc123&feature=sub'), 'ABC12306')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12307'), 'ABC12307')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/?v=ABC12308&feature=youtube_gdata_player'), 'ABC12308')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/?vi=ABC12309&feature=youtube_gdata_player'), 'ABC12309')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/watch?v=ABC12310&feature=youtube_gdata_player'), 'ABC12310')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/watch?vi=ABC12311&feature=youtube_gdata_player'), 'ABC12311')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12312&feature=youtube_gdata_player'), 'ABC12312')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/watch?v=ABC12313&feature=youtu.be'), 'ABC12313')
    })

    it('handles youtube /v/ and /vi/ formats', () => {
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/v/ABC1230'), 'ABC1230')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/v/ABC12301?feature=youtube_gdata_player'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('http://youtube.com/vi/ABC12302?feature=youtube_gdata_player'), 'ABC12302')
      assert.equal(requestHandler.getYouTubeId('https://i.ytimg.com/vi/0okagl9U2eo/hqdefault.jpg'), '0okagl9U2eo')
    })

    it('handles youtube image /an_webp/{id}/ formats', () => {
      assert.equal(requestHandler.getYouTubeId('https://i.ytimg.com/an_webp/MYDcdp-VNmQ/mqdefault_6s.webp'), 'MYDcdp-VNmQ')
    })

    it('handles youtube /embed/ formats', () => {
      assert.equal(requestHandler.getYouTubeId('https://www.youtube.com/embed/ABC1230'), 'ABC1230')
      assert.equal(requestHandler.getYouTubeId('www.youtube-nocookie.com/embed/ABC12301?rel=0'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/embed/ABC12302?rel=0'), 'ABC12302')
    })

    it('handles youtube /user/ formats', () => {
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/user/username#p/u/1/ABC1230'), 'ABC1230')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/user/username#p/a/u/2/ABC12301'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/user/username#p/u/1/ABC12302?rel=0'), 'ABC12302')
    })

    it('handles youtube attribution_links', () => {
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3DABC12300%26feature%3Dshare&a=JdfC0C9V6ZI'), 'ABC12300')
      assert.equal(requestHandler.getYouTubeId('https://www.youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DABC12301%26feature%3Dshare'), 'ABC12301')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/attribution_link?u=/watch?v=ABC12302&feature=share&list=UUsnCjinFcybOuyJU1NFOJmg&a=LjnCygXKl21WkJdyKu9O-w'), 'ABC12302')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/attribution_link?u=/watch?v=ABC12303&feature=share&a=9QlmP1yvjcllp0h3l0NwuA'), 'ABC12303')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&u=/watch?v=ABC12304&feature=em-uploademail'), 'ABC12304')
      assert.equal(requestHandler.getYouTubeId('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&feature=em-uploademail&u=/watch?v=ABC12305'), 'ABC12305')
    })
  })

  describe('stripParameters', function () {
    it('null case', function () {
      const result = requestHandler.stripParameters()
      assert.equal(result, '')
    })

    it('string with parms', function () {
      const result = requestHandler.stripParameters('this is test')
      assert.equal(result, 'this is test')
    })

    it('string with /', function () {
      const result = requestHandler.stripParameters('this is/test')
      assert.equal(result, 'this is')
    })

    it('string with ?', function () {
      const result = requestHandler.stripParameters('this is?test')
      assert.equal(result, 'this is')
    })
  })

  describe('smartQuotes', function () {
    it('null case', function () {
      const result = requestHandler.smartQuotes()
      assert.equal(result, '')
    })

    it('regular quote', function () {
      const result = requestHandler.smartQuotes(`'test'`)
      assert.equal(result, `‘test’`)
    })

    it('double quote (start)', function () {
      const result = requestHandler.smartQuotes(`'test'`)
      assert.equal(result, `‘test’`)
    })

    it('double quote (start)', function () {
      const result = requestHandler.smartQuotes(`this is "test"`)
      assert.equal(result, `this is “test”`)
    })

    it('compilation 1', function () {
      const result = requestHandler.smartQuotes(`Ma'am, this "test" is from '95`)
      assert.equal(result, `Ma’am, this “test” is from ’95`)
    })

    it('compilation 2', function () {
      const result = requestHandler.smartQuotes(`something of 'Something's`)
      assert.equal(result, `something of ’Something’s`)
    })
  })

  describe('removeByPrefix', function () {
    it('null case', function () {
      const result = requestHandler.removeByPrefix()
      assert.equal(result, '')
    })

    it('case with param null', function () {
      const result = requestHandler.removeByPrefix(null)
      assert.equal(result, '')
    })

    it('removes @ prefix', function () {
      const result = requestHandler.removeByPrefix('test @this')
      assert.equal(result, 'test this')
    })

    it('removes by prefix', function () {
      const result = requestHandler.removeByPrefix(' by me author')
      assert.equal(result, 'me author')
    })

    it('removes BY prefix', function () {
      const result = requestHandler.removeByPrefix(' BY me author')
      assert.equal(result, 'me author')
    })
  })

  describe('createTitle', function () {
    it('null case', function () {
      const result = requestHandler.createTitle()
      assert.equal(result, '')
    })

    it('case with param null', function () {
      const result = requestHandler.createTitle(null)
      assert.equal(result, '')
    })

    it('trim string', function () {
      const result = requestHandler.createTitle('   this is test ')
      assert.equal(result, 'this is test')
    })

    it('remove double and more spaces', function () {
      const result = requestHandler.createTitle('this     is  test     ')
      assert.equal(result, 'this is test')
    })

    it('create smart quotes', function () {
      const result = requestHandler.createTitle(`this "is" test which is 'ok'`)
      assert.strictEqual(result, `this “is” test which is ‘ok’`)
    })
  })

  describe('isAbsoluteUrl', function () {
    it('null case', function () {
      const result = requestHandler.isAbsoluteUrl()
      assert.equal(result, false)
    })

    it('object was send in', function () {
      const result = requestHandler.isAbsoluteUrl({})
      assert.equal(result, false)
    })

    it('http url', function () {
      const result = requestHandler.isAbsoluteUrl('http://clifton.io')
      assert.equal(result, true)
    })

    it('http url', function () {
      const result = requestHandler.isAbsoluteUrl('https://clifton.io')
      assert.equal(result, true)
    })

    it('data url', function () {
      const result = requestHandler.isAbsoluteUrl('data:text/plain;base64,31c4c5flv')
      assert.equal(result, true)
    })

    it('file url', function () {
      const result = requestHandler.isAbsoluteUrl('file://clifton.io')
      assert.equal(result, true)
    })
  })

  describe('resolveUrl', function () {
    it('null case', function () {
      const result = requestHandler.resolveUrl()
      assert.equal(result, null)
    })

    it('args are not urls', function () {
      const result = requestHandler.resolveUrl('brave', 'com')
      assert.equal(result, 'brave')
    })

    it('we only have base url', function () {
      const result = requestHandler.resolveUrl('https://brave.com')
      assert.equal(result, 'https://brave.com')
    })

    it('relative path is added', function () {
      const result = requestHandler.resolveUrl('https://brave.com', 'test')
      assert.equal(result, 'https://brave.com/test')
    })
  })

  describe('isString', function () {
    it('null case', function () {
      const result = requestHandler.isString()
      assert.equal(result, false)
    })

    it('we send object in', function () {
      const result = requestHandler.isString({})
      assert.equal(result, false)
    })

    it('we send number in', function () {
      const result = requestHandler.isString(10)
      assert.equal(result, false)
    })

    it('we send string in', function () {
      const result = requestHandler.isString('I am string')
      assert.equal(result, true)
    })
  })
})
