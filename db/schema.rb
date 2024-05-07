# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_07_164445) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "elements", force: :cascade do |t|
    t.string "type"
    t.integer "x_position"
    t.integer "y_position"
    t.integer "width"
    t.integer "height"
    t.string "content"
    t.bigint "pin_id", null: false
    t.integer "rotation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pin_id"], name: "index_elements_on_pin_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "journey_id", null: false
    t.boolean "accepted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journey_id"], name: "index_invitations_on_journey_id"
    t.index ["user_id"], name: "index_invitations_on_user_id"
  end

  create_table "journeys", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.date "start_date"
    t.date "end_date"
    t.boolean "completed"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.index ["user_id"], name: "index_journeys_on_user_id"
  end

  create_table "pin_stickers", force: :cascade do |t|
    t.bigint "pin_id", null: false
    t.bigint "sticker_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pin_id"], name: "index_pin_stickers_on_pin_id"
    t.index ["sticker_id"], name: "index_pin_stickers_on_sticker_id"
  end

  create_table "pin_templates", force: :cascade do |t|
    t.bigint "pin_id", null: false
    t.bigint "template_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pin_id"], name: "index_pin_templates_on_pin_id"
    t.index ["template_id"], name: "index_pin_templates_on_template_id"
  end

  create_table "pins", force: :cascade do |t|
    t.string "location"
    t.date "date"
    t.bigint "journey_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
    t.index ["journey_id"], name: "index_pins_on_journey_id"
  end

  create_table "stickers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "templates", force: :cascade do |t|
    t.string "name"
    t.bigint "pin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pin_id"], name: "index_templates_on_pin_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "elements", "pins"
  add_foreign_key "invitations", "journeys"
  add_foreign_key "invitations", "users"
  add_foreign_key "journeys", "users"
  add_foreign_key "pin_stickers", "pins"
  add_foreign_key "pin_stickers", "stickers"
  add_foreign_key "pin_templates", "pins"
  add_foreign_key "pin_templates", "templates"
  add_foreign_key "pins", "journeys"
  add_foreign_key "templates", "pins"
end
