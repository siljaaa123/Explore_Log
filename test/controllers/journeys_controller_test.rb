require "test_helper"

class JourneysControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get journeys_index_url
    assert_response :success
  end

  test "should get show" do
    get journeys_show_url
    assert_response :success
  end

  test "should get create" do
    get journeys_create_url
    assert_response :success
  end

  test "should get new" do
    get journeys_new_url
    assert_response :success
  end

  test "should get edit" do
    get journeys_edit_url
    assert_response :success
  end

  test "should get update" do
    get journeys_update_url
    assert_response :success
  end

  test "should get destroy" do
    get journeys_destroy_url
    assert_response :success
  end
end
