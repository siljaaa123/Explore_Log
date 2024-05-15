Grover.configure do |config|
  config.use_png_middleware = true
  config.options = {
  format: 'A4',
  viewport: {
  width: 400,
  height: 844
  },
  prefer_css_page_size: true,
  emulate_media: 'screen',
  cache: true,
  timeout: 0,
  wait_until: 'domcontentloaded',
  full_page: true
  }
end
