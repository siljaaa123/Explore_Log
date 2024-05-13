require "test_helper"

class PinTemplatesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get pin_templates_create_url
    assert_response :success
  end
end
