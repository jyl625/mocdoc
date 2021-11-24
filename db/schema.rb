# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_24_062754) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "insurances", force: :cascade do |t|
    t.string "hios_id", null: false
    t.string "carrier", null: false
    t.string "plan_id", null: false
    t.string "plan", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hios_id", "plan_id"], name: "index_insurances_on_hios_id_and_plan_id", unique: true
  end

  create_table "provider_insurances", force: :cascade do |t|
    t.string "npi", null: false
    t.string "hios_id", null: false
    t.index ["hios_id"], name: "index_provider_insurances_on_hios_id"
    t.index ["npi", "hios_id"], name: "index_provider_insurances_on_npi_and_hios_id", unique: true
    t.index ["npi"], name: "index_provider_insurances_on_npi"
  end

  create_table "provider_specialties", force: :cascade do |t|
    t.string "npi", null: false
    t.string "specialty_code", null: false
    t.index ["npi", "specialty_code"], name: "index_provider_specialties_on_npi_and_specialty_code", unique: true
    t.index ["npi"], name: "index_provider_specialties_on_npi"
  end

  create_table "providers", force: :cascade do |t|
    t.string "npi", null: false
    t.string "name", null: false
    t.string "provider_type"
    t.string "address_1"
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["npi"], name: "index_providers_on_npi", unique: true
  end

  create_table "specialties", force: :cascade do |t|
    t.string "specialty_code", null: false
    t.string "specialty_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["specialty_code"], name: "index_specialties_on_specialty_code", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
