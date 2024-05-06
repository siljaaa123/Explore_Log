require "test_helper"

class PinsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pins_index_url
    assert_response :success
  end

  test "should get show" do
    get pins_show_url
    assert_response :success
  end

  test "should get create" do
    get pins_create_url
    assert_response :success
  end

  test "should get edit" do
    get pins_edit_url
    assert_response :success
  end

  test "should get new" do
    get pins_new_url
    assert_response :success
  end

  test "should get update" do
    get pins_update_url
    assert_response :success
  end

  test "should get destroy" do
    get pins_destroy_url
    assert_response :success
  end
end
