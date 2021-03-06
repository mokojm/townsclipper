const {
  clipToBits,
  bitsToClip,
} = require('./clip-bits')

describe('clipToBits', () => {
  it('Works for valid input', () => {
    expect(clipToBits('A'))
      .toEqual('000000')
    expect(clipToBits('AA'))
      .toEqual('000000000000')
    expect(clipToBits('B'))
      .toEqual('000001')
    expect(clipToBits('AB'))
      .toEqual('000001000000')
    expect(clipToBits('4lv4r0-cuesta_github'))
      .toEqual('011011101110100001101101100010100000111110011010101101101100011110101110011100111111110100101011111000101111100101111000')
    expect(clipToBits('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyzw0123456789_-'))
      .toEqual('111111111110111101111100111011111010111001111000110111110110110101110100110011110010110001110000101111101110101101101100101011101010101001101000100111100110100101100100100011100010100001100000011111011110011101011100011011011010011001011000010111010110010101010100010011010010010001010000001111001110001101001100001011001010001001001000000111000110000101000100000011000010000001000000')
  })

  it('Works for the empty string', () => {
    expect(clipToBits('')).toEqual('')
  })

  it('Throws when receiving an invalid character', () => {
    expect(() => clipToBits('??'))
      .toThrow('Invalid clip string character ?')
    expect(() => clipToBits('+'))
      .toThrow('Invalid clip string character +')
    expect(() => clipToBits('AaA+'))
      .toThrow('Invalid clip string character +')
    expect(() => clipToBits('+AaA'))
      .toThrow('Invalid clip string character +')
  })
})

describe('bitsToClip', () => {
  it('Works for valid input', () => {
    expect(bitsToClip('000000'))
      .toEqual('A')
    expect(bitsToClip('000000000000'))
      .toEqual('AA')
    expect(bitsToClip('000001'))
      .toEqual('B')
    expect(bitsToClip('000001000000'))
      .toEqual('AB')
    expect(bitsToClip('011011101110100001101101100010100000111110011010101101101100011110101110011100111111110100101011111000101111100101111000'))
      .toEqual('4lv4r0-cuesta_github')
    expect(bitsToClip('111111111110111101111100111011111010111001111000110111110110110101110100110011110010110001110000101111101110101101101100101011101010101001101000100111100110100101100100100011100010100001100000011111011110011101011100011011011010011001011000010111010110010101010100010011010010010001010000001111001110001101001100001011001010001001001000000111000110000101000100000011000010000001000000'))
      .toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyzw0123456789_-')

  })

  it('Works for the empty string', () => {
    expect(bitsToClip('')).toEqual('')
  })

  it('Throws when receiving an invalid character', () => {
    expect(() => bitsToClip('??'))
      .toThrow('Invalid bit character ?')
    expect(() => bitsToClip('A'))
      .toThrow('Invalid bit character A')
    expect(() => bitsToClip('001000A'))
      .toThrow('Invalid bit character A')
    expect(() => bitsToClip('A000100'))
      .toThrow('Invalid bit character A')
  })

  it('Throws when receiving wrong padding', () => {
    expect(() => bitsToClip('0000'))
      .toThrow('Bit string length (4) must be a multiple of 6')
    expect(() => bitsToClip('0000000000'))
      .toThrow('Bit string length (10) must be a multiple of 6')
    expect(() => bitsToClip('0001'))
      .toThrow('Bit string length (4) must be a multiple of 6')
    expect(() => bitsToClip('1000000'))
      .toThrow('Bit string length (7) must be a multiple of 6')
    expect(() => bitsToClip('11011101110100001101101100010100000111110011010101101101100011110101110011100111111110100101011111000101111100101111000'))
      .toThrow('Bit string length (119) must be a multiple of 6')
  })
})
