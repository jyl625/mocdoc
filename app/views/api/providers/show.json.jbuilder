json.provider do 
  json.partial! "api/providers/provider", provider: @provider
end

# json.extract! @provider, :id, :npi, :name