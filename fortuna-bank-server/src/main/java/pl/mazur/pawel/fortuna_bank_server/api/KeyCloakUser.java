package pl.mazur.pawel.fortuna_bank_server.api;


import com.fasterxml.jackson.annotation.JsonProperty;

public record KeyCloakUser
        (String sub,
         @JsonProperty("name")
         String username,

         @JsonProperty("email_verified")
         boolean emailVerified,
         @JsonProperty("preferred_username")
         String preferredUsername,
         @JsonProperty("given_name")
         String givenName,
         @JsonProperty("family_name")
         String familyName,
         String email) {
}