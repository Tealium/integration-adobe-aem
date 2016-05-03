<%@ include file="/libs/foundation/global.jsp" %><%
%><%@ page contentType="text/html; charset=utf-8" import="
    com.day.cq.commons.Externalizer,
    info.geometrixx.commons.util.GeoHelper"
%><%

    final Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);

    // On the homepage, let's exceptionally take the page title, instead of the normal title,
    // because we use the title to nicely display the language in the site admin interface.
    final String title         = GeoHelper.getPageTitle(currentPage);
    final String canonicalURL  = externalizer.absoluteLink(slingRequest, "http", currentPage.getPath()) + ".html";
    final String favicon       = currentDesign.getPath() + "/favicon.ico";
    final boolean hasFavIcon   = (resourceResolver.getResource(favicon) != null);
    final String keywords      = WCMUtils.getKeywords(currentPage);
    final String description   = currentPage.getDescription();

%><head>
    <meta charset="utf-8" />
    <title><%= xssAPI.encodeForHTML(title) %></title>
    <link rel="canonical" href="<%= xssAPI.getValidHref(canonicalURL) %>" />
    <% if (hasFavIcon) { %><link rel="shortcut icon" href="<%= xssAPI.getValidHref(favicon) %>" /><% } %>
    <% if (GeoHelper.notEmpty(keywords)) { %><meta name="keywords" content="<%= xssAPI.encodeForHTMLAttr(keywords) %>" /><% } %>
    <% if (GeoHelper.notEmpty(description)) { %><meta name="description" content="<%= xssAPI.encodeForHTMLAttr(description) %>" /><% } %>
    <script>
        <%-- Adds a js class to the <html> element to create custom CSS rules if JS is enabled/disabled --%>
        document.documentElement.className+=' js';
        <%-- Makes HTML5 elements listen to CSS styling in IE6-8 (aka HTML5 Shiv) - this is using the IE conditional comments feature --%>
        /*@cc_on(function(){var e=['abbr','article','aside','audio','canvas','details','figcaption','figure','footer','header','hgroup','mark','meter','nav','output','progress','section','summary','time','video'];for (var i = e.length; i-- > 0;) document.createElement(e[i]);})();@*/
    </script>
    <cq:includeClientLib categories="apps.geometrixx-outdoors.desktop.all"/>
    <cq:include path="config" resourceType="cq/personalization/components/clientcontext_optimized/config"/>
    <sling:include path="contexthub" resourceType="granite/contexthub/components/contexthub"/>
    <% currentDesign.writeCssIncludes(pageContext); %>
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    <cq:include script="/libs/foundation/components/page/stats.jsp"/>
    <cq:include script="/libs/cq/cloudserviceconfigs/components/servicelibs/servicelibs.jsp"/>
    <cq:include script="init.jsp"/>
</head>
