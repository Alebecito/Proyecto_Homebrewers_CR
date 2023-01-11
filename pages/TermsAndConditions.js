import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import RenderHTML from "react-native-render-html";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const htmlContent = `
<p>Estos términos y condiciones (&#8220; Acuerdo&#8221;) establecer los términos y condiciones generales de su uso del &#8220; InicioCerveceros Costa Rica&#8221; Aplicación móvil (&#8220; Aplicación móvil&#8221; o &#8220; Servicio&#8221;) y cualquiera de sus productos y servicios relacionados (colectivamente, &#8220; Servicios&#8221;). Este Acuerdo es legalmente vinculante entre usted (&#8220; Usuario&#8221;, &#8220;usted&#8221; o &#8220;suyo&#8221;) y este desarrollador de aplicaciones móviles (&#8220;Operador&#8221;, &#8220;nosotros&#8221; o &#8220;nuestro&#8221;). Si está aceptando este acuerdo en nombre de una empresa u otra entidad legal, usted declara que tiene la autoridad para vincular a dicha entidad a este acuerdo, en cuyo caso los términos &#8220; Usuario&#8221;, &#8220;usted&#8221; o &#8220;suyo&#8221; se referirá a dicha entidad. Si no tiene dicha autoridad, o si no está de acuerdo con los términos de este acuerdo, no debe aceptar este acuerdo y no puede acceder ni utilizar la Aplicación móvil y los Servicios. Al acceder y utilizar la Aplicación móvil y los Servicios, usted reconoce que ha leído, entendido y acepta estar sujeto a los términos de este Acuerdo. Usted reconoce que este Acuerdo es un contrato entre usted y el Operador, aunque sea electrónico y no esté firmado físicamente por usted, y rige su uso de la Aplicación móvil y los Servicios.</p>
<div class="wpembed-index"><h3>Tabla de contenidos</h3><ol class="wpembed-index"><li>Cuentas y membresía</a></li><li>Contenido de usuario</a></li><li>Respaldos</a></li><li> Enlaces a otros recursos</a></li><li>Usos prohibidos</a></li><li>Derechos de propiedad intelectual</a></li><li>Cambios y modificaciones</a></li><li>Aceptación de estos términos</a> </li><li>Contáctenos</a></li></ol></div><h2 id="accounts-and-membership">Cuentas y membresía</h2>
<p>Debe tener al menos 18 años de edad para utilizar la Aplicación móvil y los Servicios. Al utilizar la Aplicación móvil y los Servicios y al aceptar este Acuerdo, usted garantiza y declara que tiene al menos 18 años de edad. Si crea una cuenta en la Aplicación móvil, usted es responsable de mantener la seguridad de su cuenta y es totalmente responsable de todas las actividades que ocurran bajo la cuenta y cualquier otra acción tomada en relación con ella. Podemos monitorear y revisar nuevas cuentas antes de que pueda iniciar sesión y comenzar a usar los Servicios. Proporcionar información de contacto falsa de cualquier tipo puede resultar en la cancelación de su cuenta. Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta o cualquier otra violación de seguridad. No seremos responsables de ningún acto u omisión por su parte, incluidos los daños de cualquier tipo incurridos como resultado de dichos actos u omisiones. Podemos suspender, deshabilitar o eliminar su cuenta (o cualquier parte de la misma) si determinamos que ha violado alguna disposición de este Acuerdo o que su conducta o contenido tendería a dañar nuestra reputación y buena voluntad. Si eliminamos su cuenta por las razones anteriores, no puede volver a registrarse en nuestros Servicios. Podemos bloquear su dirección de correo electrónico y dirección de protocolo de Internet para evitar un mayor registro.</p>
<h2 id="user-content">Contenido de usuario</h2>
<p>No poseemos ningún dato, información o material (colectivamente, &#8220; Contenido&#8221;) que envíe en la Aplicación móvil durante el uso del Servicio. Usted será el único responsable de la exactitud, calidad, integridad, legalidad, confiabilidad, idoneidad y propiedad intelectual o derecho de uso de todo el Contenido enviado. Podemos, pero no tenemos la obligación de, monitorear y revisar el Contenido en la Aplicación móvil enviada o creada utilizando nuestros Servicios por usted. Usted nos otorga permiso para acceder, copiar, distribuir, almacenar, transmitir, reformatear, mostrar y ejecutar el Contenido de su cuenta de usuario únicamente según sea necesario con el fin de proporcionarle los Servicios. Sin limitar ninguna de esas representaciones o garantías, tenemos el derecho, aunque no la obligación, de, a nuestra entera discreción, rechazar o eliminar cualquier Contenido que, en nuestra opinión razonable, viole cualquiera de nuestras políticas o sea de alguna manera perjudicial u objetable. También nos otorga la licencia para usar, reproducir, adaptar, modificar, publicar o distribuir el Contenido creado por usted o almacenado en su cuenta de usuario para fines comerciales, de marketing o cualquier otro similar.</p>
<h2 id="backups">Respaldos</h2>
<p>No somos responsables del Contenido que reside en la Aplicación móvil. En ningún caso seremos responsables de la pérdida de cualquier Contenido. Es su exclusiva responsabilidad mantener una copia de seguridad adecuada de su Contenido. No obstante lo anterior, en algunas ocasiones y en ciertas circunstancias, sin ninguna obligación, es posible que podamos restaurar algunos o todos sus datos que se hayan eliminado a partir de una fecha y hora en que hayamos realizado una copia de seguridad de los datos para nuestros propios fines. No garantizamos que los datos que necesita estén disponibles.</p>
<h2 id="links-to-other-resources">Enlaces a otros recursos</h2>
<p>Aunque la Aplicación móvil y los Servicios pueden vincularse a otros recursos (como sitios web, aplicaciones móviles, etc.), no implicamos, directa o indirectamente, ninguna aprobación, asociación, patrocinio, respaldo o afiliación con ningún recurso vinculado, a menos que se indique específicamente en este documento. No somos responsables de examinar o evaluar, y no garantizamos las ofertas de, ninguna empresa o individuo o el contenido de sus recursos. No asumimos ninguna responsabilidad u obligación por las acciones, productos, servicios y contenido de terceros. Debe revisar cuidadosamente las declaraciones legales y otras condiciones de uso de cualquier recurso al que acceda a través de un enlace en la Aplicación móvil. Su enlace a cualquier otro recurso externo es bajo su propio riesgo.</p>
<h2 id="usos prohibidos">Usos prohibidos</h2>
<p>Además de otros términos establecidos en el Acuerdo, se le prohíbe usar la Aplicación móvil y los Servicios o el Contenido: (a) para cualquier propósito ilegal; (b) solicitar a otros que realicen o participen en cualquier acto ilegal; (c) violar cualquier regulación, norma, ley u ordenanza local internacional, federal, provincial o estatal; (d) infringir o violar nuestros derechos de propiedad intelectual o los derechos de propiedad intelectual de otros; (e) acosar, abusar, insultar, dañar, difamar, calumniar, menospreciar, intimidar o discriminar por motivos de género, orientación sexual, religión, etnia, raza, edad, origen nacional o discapacidad; f) presentar información falsa o engañosa; (g) para cargar o transmitir virus o cualquier otro tipo de código malicioso que se utilizará o puede usarse de cualquier manera que afecte la funcionalidad u operación de la Aplicación móvil y los Servicios, productos y servicios de terceros o Internet; (h) para spam, phish, pharm, pretexto, araña, rastreo o raspado; (i) para cualquier propósito obsceno o inmoral; o (j) interferir o eludir las características de seguridad de la Aplicación móvil y los Servicios, productos y servicios de terceros o Internet. Nos reservamos el derecho de terminar su uso de la Aplicación móvil y los Servicios por violar cualquiera de los usos prohibidos.</p>
<h2 id="derechos de propiedad intelectual">Derechos de propiedad intelectual</h2>
<p>&#8220;Derechos de Propiedad Intelectual&#8221; significa todos los derechos presentes y futuros conferidos por ley, derecho consuetudinario o equidad en o en relación con cualquier derecho de autor y derechos relacionados, marcas comerciales, diseños, patentes, invenciones, buena voluntad y el derecho a demandar por imitación, derechos de invención, derechos de uso y todos los demás derechos de propiedad intelectual, en cada caso, ya sean registrados o no registrados, incluidas todas las solicitudes y derechos para solicitar y ser otorgados,  los derechos a reivindicar la prioridad, tales derechos y todos los derechos o formas de protección similares o equivalentes y cualquier otro resultado de la actividad intelectual que subsista o subsista ahora o en el futuro en cualquier parte del mundo. Este Acuerdo no le transfiere ninguna propiedad intelectual propiedad del Operador o de terceros, y todos los derechos, títulos e intereses en y para dicha propiedad permanecerán (entre las partes) únicamente con el Operador. Todas las marcas comerciales, marcas de servicio, gráficos y logotipos utilizados en relación con la Aplicación móvil y los Servicios son marcas comerciales o marcas comerciales registradas del Operador o sus licenciantes. Otras marcas comerciales, marcas de servicio, gráficos y logotipos utilizados en relación con la Aplicación móvil y los Servicios pueden ser marcas comerciales de terceros. Su uso de la Aplicación móvil y los Servicios no le otorga ningún derecho o licencia para reproducir o utilizar de otro modo cualquiera de las marcas comerciales del Operador o de terceros.</p>
<h2 id="cambios y modificaciones">Cambios y modificaciones</h2>
<p>Nos reservamos el derecho de modificar este Acuerdo o sus términos relacionados con la Aplicación móvil y los Servicios en cualquier momento a nuestra discreción. Cuando lo hagamos, publicaremos una notificación en la Aplicación móvil. También podemos notificarle de otras maneras a nuestra discreción, como a través de la información de contacto que ha proporcionado.</p>
<p>Una versión actualizada de este Acuerdo entrará en vigencia inmediatamente después de la publicación del Acuerdo revisado, a menos que se especifique lo contrario. Su uso continuado de la Aplicación móvil y los Servicios después de la fecha de vigencia del Acuerdo revisado (o cualquier otro acto especificado en ese momento) constituirá su consentimiento a dichos cambios.</p>
<h2 id="aceptación-de-estos-términos">Aceptación de estos términos</h2>
<p>Usted reconoce que ha leído este Acuerdo y acepta todos sus términos y condiciones. Al acceder y utilizar la Aplicación móvil y los Servicios, usted acepta estar sujeto a este Acuerdo. Si no acepta cumplir con los términos de este Acuerdo, no está autorizado a acceder o utilizar la Aplicación móvil y los Servicios.
<h2 id="contacting-us">Contáctenos</h2>
<p>Si tiene alguna pregunta, inquietud o queja con respecto a este Acuerdo, le recomendamos que se comunique con nosotros utilizando los detalles a continuación: </p>
<p><a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#115;u&#112;&#112;ort&#64;&#104;ome&#98;&#114;e&#119;ers_c&#114;. &#99;om">s&#117;&#112;&#112;ort&#64;hom&#101;b&#114;&#101;we&#114;s_cr&#46;c&#111;m</a></p>
`;

class TermsAndConditions extends Component {
  state = {
    accepted: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Términos y condiciones</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                accepted: true,
              });
            }
          }}
        >
          <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
        </ScrollView>

        <TouchableOpacity
          disabled={!this.state.accepted}
          onPress={() => this.props.navigation.goBack()}
          style={this.state.accepted ? styles.button : styles.buttonDisabled}
        >
          <Text style={styles.buttonLabel}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    alignSelf: "center",
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: "#136AC7",
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: "#999",
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: "#FFF",
    alignSelf: "center",
  },
};

export default TermsAndConditions;
