# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :email,           presence: true, uniqueness: true
  validates_format_of :email,  with: URI::MailTo::EMAIL_REGEXP
  validates :password_digest, presence: true
  validates :session_token,   presence: true, uniqueness: true
  validates :password,        length: {minimum: 6, allow_nil: true}
  validates :first_name,      presence: true
  validates :last_name,       presence: true
  validates :date_of_birth,   presence: true

  belongs_to :insurance,
    primary_key: :plan_id,
    class_name: :Insurance,
    foreign_key: :plan_id


  attr_reader :password

  after_initialize :ensure_session_token

  #Association goes here

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_valid_password?(password)
      user
    else
      nil
    end
  end

  def is_valid_password?(password)
    pw_obj = BCrypt::Password.new(password_digest)
    pw_obj.is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

end
