package congvanservice.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@ConfigurationProperties(prefix = "security-auth")
@Configuration
class ResourceServerClientConfig {
    Boolean enabled = false;
}
